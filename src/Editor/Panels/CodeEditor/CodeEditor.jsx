/*
 * Copyright 2018 WICKLETS LLC
 *
 * This file is part of Wick Editor.
 *
 * Wick Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wick Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wick Editor.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import './_codeeditor.scss';

class CodeEditor extends Component {
  constructor (props) {
    super(props);

    this.renderAceEditor = this.renderAceEditor.bind(this);
    this.renderNotScriptableInfo = this.renderNotScriptableInfo.bind(this);

    this.selectionIsScriptable = this.selectionIsScriptable.bind(this);
    this.getSelectionScript = this.getSelectionScript.bind(this);
    this.updateSelectionScript = this.updateSelectionScript.bind(this);
  }

  render() {
    this.refs.reactAceComponent && this.refs.reactAceComponent.editor.resize();
    return (
      <div className="code-editor">
        {this.selectionIsScriptable(this.props.selection)
          ? this.renderAceEditor()
          : this.renderNotScriptableInfo()}
      </div>
    );
  }

  renderAceEditor () {
    return (
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="ace-editor"
        fontSize={14}
        ref="reactAceComponent"
        onChange={(e) => {this.updateSelectionScript(this.props.selection, this.props.project, e)}}
        editorProps={{$blockScrolling: true}}
        value={this.getSelectionScript(this.props.selection, this.props.project).src}
      />
    );
  }

  renderNotScriptableInfo () {
    return (
      <div>not scriptable</div>
    )
  }

  selectionIsScriptable (selection) {
    return false;
    /*
    return selection.type === 'frame'
        || selection.type === 'clip'
        || selection.type === 'button';
        */
  }

  getSelectionScript (selection, project) {
    if(selection.type === 'frame') {
      return project._childByUUID(selection.selectedFrames[0].uuid).script;
    } else if (selection.type === 'clip'
            || selection.type === 'button') {
      return project._childByUUID(selection.selectedClips[0].uuid).script;
    }
  }

  updateSelectionScript (selection, project, newScript) {
    let script = this.getSelectionScript(selection, project);
    script.src = newScript;
    this.props.updateEditorState({project:project});
  }
}

export default CodeEditor;
