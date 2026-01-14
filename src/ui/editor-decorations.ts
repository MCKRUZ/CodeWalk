/**
 * Editor Decorations
 * 
 * Visual markers in the editor showing walkthrough steps.
 */

import * as vscode from 'vscode';
import { WalkthroughStep } from '../types';

export class EditorDecorations {
  private currentStepDecoration: vscode.TextEditorDecorationType;
  private stepMarkerDecoration: vscode.TextEditorDecorationType;
  private visitedStepDecoration: vscode.TextEditorDecorationType;

  constructor() {
    // Current step - highlighted background
    this.currentStepDecoration = vscode.window.createTextEditorDecorationType({
      backgroundColor: 'rgba(255, 213, 79, 0.15)',
      borderLeft: '3px solid #FFC107',
      isWholeLine: true,
      overviewRulerColor: '#FFC107',
      overviewRulerLane: vscode.OverviewRulerLane.Left,
    });

    // Step markers in gutter
    this.stepMarkerDecoration = vscode.window.createTextEditorDecorationType({
      gutterIconPath: this.createGutterIcon('#6B7280'),
      gutterIconSize: 'contain',
    });

    // Visited steps - subtle indicator
    this.visitedStepDecoration = vscode.window.createTextEditorDecorationType({
      backgroundColor: 'rgba(107, 114, 128, 0.08)',
      isWholeLine: true,
    });
  }

  /**
   * Highlight the current step and mark all steps
   */
  highlightStep(
    editor: vscode.TextEditor,
    currentStep: WalkthroughStep,
    allSteps: WalkthroughStep[]
  ): void {
    // Clear previous decorations
    this.clearAll(editor);

    // Current step highlight
    const currentRange = new vscode.Range(
      currentStep.startLine - 1,
      0,
      currentStep.endLine - 1,
      Number.MAX_VALUE
    );
    editor.setDecorations(this.currentStepDecoration, [currentRange]);

    // Markers for other steps
    const otherStepRanges = allSteps
      .filter((s) => s.id !== currentStep.id)
      .map((step) => ({
        range: new vscode.Range(step.startLine - 1, 0, step.startLine - 1, 0),
        hoverMessage: `Step ${step.index + 1}: ${step.title}`,
      }));

    editor.setDecorations(this.stepMarkerDecoration, otherStepRanges);
  }

  /**
   * Clear all decorations from editor
   */
  clearAll(editor?: vscode.TextEditor): void {
    const editors = editor ? [editor] : vscode.window.visibleTextEditors;

    editors.forEach((e) => {
      e.setDecorations(this.currentStepDecoration, []);
      e.setDecorations(this.stepMarkerDecoration, []);
      e.setDecorations(this.visitedStepDecoration, []);
    });
  }

  /**
   * Dispose of decoration types
   */
  dispose(): void {
    this.currentStepDecoration.dispose();
    this.stepMarkerDecoration.dispose();
    this.visitedStepDecoration.dispose();
  }

  /**
   * Create a simple gutter icon (SVG data URI)
   */
  private createGutterIcon(color: string): vscode.Uri {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="4" fill="${color}"/>
    </svg>`;
    
    const encoded = Buffer.from(svg).toString('base64');
    return vscode.Uri.parse(`data:image/svg+xml;base64,${encoded}`);
  }
}
