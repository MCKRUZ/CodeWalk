/**
 * Step Generator
 * 
 * Analyzes code and generates logical walkthrough steps.
 * Uses heuristics to identify meaningful code blocks.
 */

import { GeneratedStep } from '../types';
import { Logger } from '../utils/logger';

export class StepGenerator {
  /**
   * Generate steps from code
   */
  async generateSteps(
    code: string,
    language: string,
    startLineOffset: number = 1
  ): Promise<GeneratedStep[]> {
    Logger.debug(`Generating steps for ${language} code (${code.length} chars)`);

    const lines = code.split('\n');
    const steps: GeneratedStep[] = [];

    // Use language-specific parsing
    switch (language) {
      case 'typescript':
      case 'javascript':
        return this.parseJavaScriptLike(lines, startLineOffset);
      case 'csharp':
        return this.parseCSharp(lines, startLineOffset);
      default:
        return this.parseGeneric(lines, startLineOffset);
    }
  }

  /**
   * Parse JavaScript/TypeScript code into steps
   */
  private parseJavaScriptLike(lines: string[], offset: number): GeneratedStep[] {
    const steps: GeneratedStep[] = [];
    let currentStep: Partial<GeneratedStep> | null = null;
    let braceDepth = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      const lineNum = i + offset;

      // Skip empty lines and comments at top level
      if (!trimmed || trimmed.startsWith('//')) {
        continue;
      }

      // Track brace depth
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;

      // Identify step boundaries
      const isStepStart = this.isJSStepStart(trimmed, braceDepth);

      if (isStepStart && !currentStep) {
        currentStep = {
          startLine: lineNum,
          codeSnippet: line,
          title: this.extractJSTitle(trimmed),
          stepType: this.determineStepType(trimmed),
        };
      } else if (currentStep) {
        currentStep.codeSnippet += '\n' + line;
      }

      braceDepth += openBraces - closeBraces;

      // End step at statement end or matching brace
      const isStepEnd = this.isJSStepEnd(trimmed, braceDepth, currentStep);

      if (isStepEnd && currentStep) {
        currentStep.endLine = lineNum;
        steps.push(currentStep as GeneratedStep);
        currentStep = null;
      }
    }

    // Handle unclosed step
    if (currentStep) {
      currentStep.endLine = lines.length + offset - 1;
      steps.push(currentStep as GeneratedStep);
    }

    return this.consolidateSteps(steps);
  }

  /**
   * Parse C# code into steps
   */
  private parseCSharp(lines: string[], offset: number): GeneratedStep[] {
    const steps: GeneratedStep[] = [];
    let currentStep: Partial<GeneratedStep> | null = null;
    let braceDepth = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      const lineNum = i + offset;

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('//')) {
        continue;
      }

      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;

      const isStepStart = this.isCSharpStepStart(trimmed, braceDepth);

      if (isStepStart && !currentStep) {
        currentStep = {
          startLine: lineNum,
          codeSnippet: line,
          title: this.extractCSharpTitle(trimmed),
          stepType: this.determineStepType(trimmed),
        };
      } else if (currentStep) {
        currentStep.codeSnippet += '\n' + line;
      }

      braceDepth += openBraces - closeBraces;

      const isStepEnd = this.isCSharpStepEnd(trimmed, braceDepth, currentStep);

      if (isStepEnd && currentStep) {
        currentStep.endLine = lineNum;
        steps.push(currentStep as GeneratedStep);
        currentStep = null;
      }
    }

    if (currentStep) {
      currentStep.endLine = lines.length + offset - 1;
      steps.push(currentStep as GeneratedStep);
    }

    return this.consolidateSteps(steps);
  }

  /**
   * Generic parser for other languages
   */
  private parseGeneric(lines: string[], offset: number): GeneratedStep[] {
    const steps: GeneratedStep[] = [];
    let stepLines: string[] = [];
    let startLine = offset;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        // Empty line might be a step boundary
        if (stepLines.length > 0) {
          steps.push({
            startLine,
            endLine: i + offset - 1,
            codeSnippet: stepLines.join('\n'),
            title: this.extractGenericTitle(stepLines[0]),
            stepType: 'supporting',
          });
          stepLines = [];
        }
        startLine = i + offset + 1;
      } else {
        if (stepLines.length === 0) {
          startLine = i + offset;
        }
        stepLines.push(line);
      }
    }

    // Handle remaining lines
    if (stepLines.length > 0) {
      steps.push({
        startLine,
        endLine: lines.length + offset - 1,
        codeSnippet: stepLines.join('\n'),
        title: this.extractGenericTitle(stepLines[0]),
        stepType: 'supporting',
      });
    }

    return this.consolidateSteps(steps);
  }

  /**
   * Check if line starts a new JS/TS step
   */
  private isJSStepStart(line: string, depth: number): boolean {
    if (depth > 1) return false;

    return (
      line.startsWith('const ') ||
      line.startsWith('let ') ||
      line.startsWith('var ') ||
      line.startsWith('function ') ||
      line.startsWith('async ') ||
      line.startsWith('if ') ||
      line.startsWith('if(') ||
      line.startsWith('for ') ||
      line.startsWith('for(') ||
      line.startsWith('while ') ||
      line.startsWith('while(') ||
      line.startsWith('switch ') ||
      line.startsWith('try ') ||
      line.startsWith('return ') ||
      line.startsWith('await ') ||
      line.match(/^\w+\s*\(/) !== null || // Function call
      line.match(/^\w+\.\w+/) !== null // Method call
    );
  }

  /**
   * Check if line ends a JS/TS step
   */
  private isJSStepEnd(
    line: string,
    depth: number,
    step: Partial<GeneratedStep> | null
  ): boolean {
    if (!step) return false;

    return (
      line.endsWith(';') ||
      (line.endsWith('}') && depth === 0) ||
      (line.endsWith('},') && depth === 0)
    );
  }

  /**
   * Check if line starts a new C# step
   */
  private isCSharpStepStart(line: string, depth: number): boolean {
    if (depth > 1) return false;

    return (
      line.startsWith('var ') ||
      line.startsWith('int ') ||
      line.startsWith('string ') ||
      line.startsWith('bool ') ||
      line.startsWith('if ') ||
      line.startsWith('if(') ||
      line.startsWith('for ') ||
      line.startsWith('foreach ') ||
      line.startsWith('while ') ||
      line.startsWith('switch ') ||
      line.startsWith('try ') ||
      line.startsWith('return ') ||
      line.startsWith('await ') ||
      line.startsWith('using ') ||
      line.match(/^\w+\s+\w+\s*=/) !== null || // Variable declaration
      line.match(/^\w+\s*\(/) !== null || // Method call
      line.match(/^await\s+\w+/) !== null
    );
  }

  /**
   * Check if line ends a C# step
   */
  private isCSharpStepEnd(
    line: string,
    depth: number,
    step: Partial<GeneratedStep> | null
  ): boolean {
    if (!step) return false;

    return (
      line.endsWith(';') ||
      (line.endsWith('}') && depth === 0)
    );
  }

  /**
   * Extract a title from JS/TS code
   */
  private extractJSTitle(line: string): string {
    // Variable declaration
    const varMatch = line.match(/^(?:const|let|var)\s+(\w+)/);
    if (varMatch) return `Initialize ${varMatch[1]}`;

    // Function declaration
    const funcMatch = line.match(/^(?:async\s+)?function\s+(\w+)/);
    if (funcMatch) return `Define ${funcMatch[1]}`;

    // Arrow function assignment
    const arrowMatch = line.match(/^(?:const|let)\s+(\w+)\s*=/);
    if (arrowMatch && line.includes('=>')) return `Define ${arrowMatch[1]}`;

    // Control flow
    if (line.startsWith('if')) return 'Conditional check';
    if (line.startsWith('for')) return 'Loop iteration';
    if (line.startsWith('while')) return 'While loop';
    if (line.startsWith('switch')) return 'Switch statement';
    if (line.startsWith('try')) return 'Try block';
    if (line.startsWith('return')) return 'Return statement';

    // Method call
    const callMatch = line.match(/^(?:await\s+)?(\w+(?:\.\w+)*)\s*\(/);
    if (callMatch) return `Call ${callMatch[1]}`;

    return 'Code block';
  }

  /**
   * Extract a title from C# code
   */
  private extractCSharpTitle(line: string): string {
    // Variable declaration
    const varMatch = line.match(/^(?:var|int|string|bool|\w+)\s+(\w+)\s*=/);
    if (varMatch) return `Initialize ${varMatch[1]}`;

    // Control flow
    if (line.startsWith('if')) return 'Conditional check';
    if (line.startsWith('for') || line.startsWith('foreach')) return 'Loop iteration';
    if (line.startsWith('while')) return 'While loop';
    if (line.startsWith('switch')) return 'Switch statement';
    if (line.startsWith('try')) return 'Try block';
    if (line.startsWith('return')) return 'Return statement';
    if (line.startsWith('using')) return 'Using statement';

    // Method call
    const callMatch = line.match(/^(?:await\s+)?(\w+(?:\.\w+)*)\s*\(/);
    if (callMatch) return `Call ${callMatch[1]}`;

    return 'Code block';
  }

  /**
   * Extract a title from generic code
   */
  private extractGenericTitle(line: string): string {
    const trimmed = line.trim();
    if (trimmed.length > 40) {
      return trimmed.substring(0, 37) + '...';
    }
    return trimmed || 'Code block';
  }

  /**
   * Determine step importance
   */
  private determineStepType(line: string): 'critical' | 'supporting' | 'detail' {
    // Critical: main logic, API calls, data mutations
    if (
      line.includes('await ') ||
      line.includes('fetch(') ||
      line.includes('return ') ||
      line.match(/\.\w+Async\(/) ||
      line.includes('.save') ||
      line.includes('.create') ||
      line.includes('.update') ||
      line.includes('.delete')
    ) {
      return 'critical';
    }

    // Supporting: control flow, assignments
    if (
      line.startsWith('if') ||
      line.startsWith('for') ||
      line.startsWith('while') ||
      line.includes(' = ')
    ) {
      return 'supporting';
    }

    return 'detail';
  }

  /**
   * Consolidate small steps and limit total count
   */
  private consolidateSteps(steps: GeneratedStep[]): GeneratedStep[] {
    // If too few steps, return as-is
    if (steps.length <= 3) return steps;

    // If too many steps, consolidate small ones
    if (steps.length > 15) {
      const consolidated: GeneratedStep[] = [];
      let buffer: GeneratedStep[] = [];

      for (const step of steps) {
        if (step.stepType === 'critical') {
          // Flush buffer before critical step
          if (buffer.length > 0) {
            consolidated.push(this.mergeSteps(buffer));
            buffer = [];
          }
          consolidated.push(step);
        } else {
          buffer.push(step);
          if (buffer.length >= 3) {
            consolidated.push(this.mergeSteps(buffer));
            buffer = [];
          }
        }
      }

      if (buffer.length > 0) {
        consolidated.push(this.mergeSteps(buffer));
      }

      return consolidated;
    }

    return steps;
  }

  /**
   * Merge multiple steps into one
   */
  private mergeSteps(steps: GeneratedStep[]): GeneratedStep {
    return {
      startLine: steps[0].startLine,
      endLine: steps[steps.length - 1].endLine,
      codeSnippet: steps.map((s) => s.codeSnippet).join('\n'),
      title: steps.length === 1 ? steps[0].title : `${steps[0].title} (+ ${steps.length - 1} more)`,
      stepType: steps.some((s) => s.stepType === 'critical') ? 'critical' : 'supporting',
    };
  }
}
