/*
 * Copyright 2020 WICKLETS LLC
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
import './_toolbox.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import WickInput from 'Editor/Util/WickInput/WickInput';
import ToolboxBreak from './ToolboxBreak/ToolboxBreak';
import ToolButton from './ToolButton/ToolButton';
import ToolSettings from './ToolSettings/ToolSettings';
import CanvasActions from './CanvasActions/CanvasActions';

var classNames = require('classnames');

class Toolbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSettings: null,
      moreCanvasActionsPopoverOpen: false,
    }

    this.toolButtonProps = {
      setActiveTool: this.props.setActiveTool,
      className: 'toolbox-item',
      getActiveToolName: this.props.getActiveToolName,
    }

    // List of callbacks to call on Scroll.
    this.scrollFns = [];
  }

  renderAction = (action, i) => {
    if (action === 'break') {
      return (
        <ToolboxBreak className="toolbox-item"/>
      );
    }
    return(
      <ToolButton
        {...this.toolButtonProps}
        activeTool={this.props.activeToolName}
        action={action.action}
        className='toolbox-item'
        name={action.icon}
        key={i}
        tooltip={action.tooltip} />
    );
  }

  renderToolButtonFromAction = (action) => {
    return (
      <ToolButton
      {...this.toolButtonProps}
      action={action.action}
      name={action.icon}
      tooltip={action.tooltip} />
    );
  }

  renderToolButtons = () => {
    return (
      <div className="tool-collection-container">
        <ToolButton {...this.toolButtonProps} name='cursor' tooltip="Cursor (C)" />
        <ToolButton {...this.toolButtonProps} name='brush' tooltip="Brush (B)" />
        <ToolButton {...this.toolButtonProps} name='pencil' tooltip="Pencil (P)" />
        <ToolButton {...this.toolButtonProps} name='eraser' tooltip="Eraser (E)" />
        <ToolButton {...this.toolButtonProps} name='rectangle' tooltip="Rectangle (R)" />
        <ToolButton {...this.toolButtonProps} name='ellipse' tooltip="Ellipse (O)" />
        <ToolButton {...this.toolButtonProps} name='line' tooltip="Line (L)" />
        <ToolButton {...this.toolButtonProps} name='pathcursor' tooltip="Path Cursor (A)" />
        <ToolButton {...this.toolButtonProps} name='text' tooltip="Text (T)" />
        <ToolButton {...this.toolButtonProps} name='fillbucket' tooltip="Fill Bucket (F)" />
        <ToolButton {...this.toolButtonProps} name='eyedropper' tooltip="Eyedropper (D)" />
      </div>
    )
  }

  renderColorPickers = () => {
    return (
      <div className="tool-collection-container">
        <div className="color-container toolbox-item" id="fill-color-picker-container">
          <WickInput
            type="color"
            color={this.props.getToolSetting('fillColor').rgba}
            onChange={(color) => {this.props.setToolSetting('fillColor', new window.Wick.Color(color));}}
            id="tool-box-fill-color"
            tooltipID="tool-box-fill-color"
            tooltip="Fill Color"
            placement="bottom"
            colorPickerType={this.props.colorPickerType}
            changeColorPickerType={this.props.changeColorPickerType}
            updateLastColors={this.props.updateLastColors}
            lastColorsUsed={this.props.lastColorsUsed}
            />
        </div>
        <div className="color-container toolbox-item" id="stroke-color-picker-container">
          <WickInput
            type="color"
            color= {this.props.getToolSetting('strokeColor').rgba}
            onChange={(color) => {this.props.setToolSetting('strokeColor', new window.Wick.Color(color));}}
            id="tool-box-stroke-color"
            tooltipID="tool-box-stroke-color"
            tooltip="Stroke Color"
            placement="bottom"
            stroke={true}
            colorPickerType={this.props.colorPickerType}
            changeColorPickerType={this.props.changeColorPickerType}
            lastColorsUsed={this.props.lastColorsUsed}
            />
        </div>
      </div>
    )
  }

  renderCanvasActions = () => {
    return (
      <div className="toolbox-actions-right-container">
        <div className="toolbox-actions-right">

          <div id="more-canvas-actions-popover-button">
            {this.renderToolButtonFromAction(this.props.editorActions.showMoreCanvasActions)}
            <CanvasActions {...this.props} />
          </div>

        {this.renderToolButtonFromAction(this.props.editorActions.delete)}
        {this.renderToolButtonFromAction(this.props.editorActions.copy)}
        {this.renderToolButtonFromAction(this.props.editorActions.paste)}
        {this.renderToolButtonFromAction(this.props.editorActions.undo)}
        {this.renderToolButtonFromAction(this.props.editorActions.redo)}
      </div>
    </div>
    )
  }

  renderLargeToolbox = () => {
    return (
      <div className={classNames("tool-box", "tool-box-large")}>
        {this.renderToolButtons()}

        <ToolboxBreak className="toolbox-item"/>

        {this.renderColorPickers()}

        <ToolboxBreak className="toolbox-item"/>

        <ToolSettings
          activeTool={this.props.activeToolName}
          getToolSetting={this.props.getToolSetting}
          setToolSetting={this.props.setToolSetting}
          getToolSettingRestrictions={this.props.getToolSettingRestrictions}
          toggleBrushModes={this.props.toggleBrushModes}
          showCanvasActions={this.props.showCanvasActions}
          showBrushModes={this.props.showBrushModes}
        />

        {this.renderCanvasActions()}
      </div>
    )

  }

  renderMediumToolbox = () => {
    return (
      <div className={classNames("tool-box", "tool-box-medium")}>
        <div className="medium-toolbox-row">
          {this.renderToolButtons()}
          <ToolboxBreak className="toolbox-item"/>
          {this.renderColorPickers()}
          <ToolboxBreak className="toolbox-item"/>
        </div>
        <div className="medium-toolbox-row">
          <ToolSettings
            activeTool={this.props.activeToolName}
            getToolSetting={this.props.getToolSetting}
            setToolSetting={this.props.setToolSetting}
            getToolSettingRestrictions={this.props.getToolSettingRestrictions}
            toggleBrushModes={this.props.toggleBrushModes}
            showCanvasActions={this.props.showCanvasActions}
            showBrushModes={this.props.showBrushModes}/>
            {this.renderCanvasActions()}
        </div>

      </div>
    )
  }

  render() {

    return (
      <div className="tool-box-container">
        {this.props.renderSize === 'large' ? this.renderLargeToolbox() : this.renderMediumToolbox()}
      </div>
    )
  }
}

export default Toolbox
