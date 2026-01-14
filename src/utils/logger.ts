/**
 * Logger Utility
 * 
 * Centralized logging with output channel support.
 */

import * as vscode from 'vscode';

export class Logger {
  private static outputChannel: vscode.OutputChannel | undefined;
  private static debugMode = false;

  /**
   * Initialize the logger
   */
  static init(): void {
    this.outputChannel = vscode.window.createOutputChannel('CodeWalk');
    
    // Check if debug mode is enabled
    const config = vscode.workspace.getConfiguration('codewalk');
    this.debugMode = config.get<boolean>('debug', false);
  }

  /**
   * Log debug message (only in debug mode)
   */
  static debug(message: string, ...args: unknown[]): void {
    if (!this.debugMode) {return;}
    this.log('DEBUG', message, args);
  }

  /**
   * Log info message
   */
  static info(message: string, ...args: unknown[]): void {
    this.log('INFO', message, args);
  }

  /**
   * Log warning message
   */
  static warn(message: string, ...args: unknown[]): void {
    this.log('WARN', message, args);
  }

  /**
   * Log error message
   */
  static error(message: string, error?: Error): void {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [ERROR] ${message}`;

    this.outputChannel?.appendLine(formatted);
    if (error) {
      this.outputChannel?.appendLine(`  Error: ${error.message}`);
      if (error.stack) {
        this.outputChannel?.appendLine(`  Stack: ${error.stack}`);
      }
    }

    console.error(formatted, error);
  }

  /**
   * Show the output channel
   */
  static show(): void {
    this.outputChannel?.show();
  }

  /**
   * Internal log method
   */
  private static log(level: string, message: string, args: unknown[]): void {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${message}`;

    this.outputChannel?.appendLine(
      args.length > 0 ? `${formatted} ${JSON.stringify(args)}` : formatted
    );

    if (level === 'DEBUG') {
      console.debug(formatted, ...args);
    } else if (level === 'WARN') {
      console.warn(formatted, ...args);
    } else {
      console.log(formatted, ...args);
    }
  }
}
