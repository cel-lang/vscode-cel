'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import celfmt from './celfmt';
import * as liveServer from 'live-server';
import LiveServerContentProvider from './LiveServerContentProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.workspace.registerTextDocumentContentProvider('LiveServerPreview', new LiveServerContentProvider());
  
  //  celfmt.restart();
//    vscode.window.showInformationMessage(workspacePath);
  const docRoot = vscode.window.activeTextEditor.document.uri.path.substr(0, 
    vscode.window.activeTextEditor.document.uri.path.lastIndexOf('/'));
 // vscode.window.showInformationMessage(extensionRoot);

  const rootPath = context.extensionPath+"\\CELGraph";
//  vscode.window.showInformationMessage();
  
  liveServer.start({
    port: 0, // random port
    host: '127.0.0.1',
    root: rootPath,
    open: false
  });

  const celPath = "index.html";

  const previewUri =
    vscode.Uri.parse(`LiveServerPreview://authority/${celPath}`);

  vscode.commands
  .executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two)
  .then(s => console.log('done'), vscode.window.showErrorMessage);

 //   vscode.TextEditor.document.uri.path.substr(0, vscode.TextEditor.document.uri.path.lastIndexOf('/'));
    //textEditor.document.uri.path.substr(0, textEditor.document.uri.path.lastIndexOf('/'));
 //   vscode.window.showInformationMessage('Hello World!');

    
}

// this method is called when your extension is deactivated
export function deactivate() {
  liveServer.shutdown(); 
}