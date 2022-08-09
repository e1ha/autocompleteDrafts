import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  
  import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
  // import { Widget } from '@lumino/widgets';
  // import { Message } from '@lumino/messaging';
  import { CodeMirrorEditor } from '@jupyterlab/codemirror';
  import { CodeEditor, CodeEditorWrapper, IEditorServices } from '@jupyterlab/codeeditor';
  // import { IEditorFactoryService } from '@jupyterlab/codeeditor';
  // import {IEditorServices} from '@jupyterlab/codeeditor';
  
  /**
   * Initialization data for the jupyterlab_apod2 extension.
   */
  const extension: JupyterFrontEndPlugin<void> = {
    id: 'jupyterlab_apod2:plugin',
    autoStart: true,
    requires: [ICommandPalette],
    activate: (app: JupyterFrontEnd, palette: ICommandPalette, editorServices:IEditorServices) => {
      console.log('LLLLLLL JupyterLab extension jupyterlab_apod2 is activated!');
    
      // class LogWidget extends CodeEditorWrapper {
      //   methods: string[] = [];
      
      //   protected onActivateRequest(msg: Message): void {
      //     super.onActivateRequest(msg);
      //     this.methods.push('onActivateRequest');
      //   }
      
      //   protected onAfterAttach(msg: Message): void {
      //     super.onAfterAttach(msg);
      //     this.methods.push('onAfterAttach');
      //   }
      
      //   protected onBeforeDetach(msg: Message): void {
      //     super.onBeforeDetach(msg);
      //     this.methods.push('onBeforeDetach');
      //   }
      
      //   protected onAfterShow(msg: Message): void {
      //     super.onAfterShow(msg);
      //     this.methods.push('onAfterShow');
      //   }
      
      //   protected onResize(msg: Widget.ResizeMessage): void {
      //     super.onResize(msg);
      //     this.methods.push('onResize');
      //   }
      // }
  
      class LogEditor extends CodeMirrorEditor {
        methods: string[] = [];
        events: string[] = [];
      
        handleEvent(event: Event): void {
          super.handleEvent(event);
          this.events.push(event.type);
        }
      }
  
      const editorFactory = (options: CodeEditor.IOptions) => {
        options.uuid = 'foo';
        return new LogEditor(options);
      };
      // Create a blank content widget inside of a MainAreaWidget
      // let content: CodeEditor.IEditor;
  
      // let model: CodeEditor.Model;
  
      let model = new CodeEditor.Model();
  
      // // CodeEditorWrapper takes in a options: IOptions parameter
      // // consists of a wrapper 
      const content = new CodeEditorWrapper({model, factory: editorFactory});
  
      // const content = new Widget();
  
      // let body = document.createElement("body");
      // let content = IEditorFactoryService.newDocumentEditor();
  
      const widget = new MainAreaWidget({ content });
      widget.id = 'apod-jupyterlab';
      widget.title.label = 'Text Editor';
      widget.title.closable = true;
    
      
      // Add an application command
      const command: string = 'apod:open';
      app.commands.addCommand(command, {
        label: 'Text Editor',
        execute: () => {
          if (!widget.isAttached) {
            // Attach the widget to the main work area if it's not there
             app.shell.add(widget, 'main');
           }
           // Activate the widget
           app.shell.activateById(widget.id);
        }
      });
     
      // Add the command to the palette.
      palette.addItem({ command, category: 'Tutorial' });
      
    }
  };
  
  export default extension;
  