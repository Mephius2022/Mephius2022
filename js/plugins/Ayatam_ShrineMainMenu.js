//=============================================================================
// plugin Ayatam_ShrineMainMenu.js
// ■ Shrine様専用メインメニューMV 対応コアver 1.6.3
//
// (C)2023 ayatam
//=============================================================================
//  【更新内容】
//  2023/2/5 v0.01 試作完成。
//=============================================================================

var Imported = Imported || {};
Imported.ShrineMainMenu = true;

var Ayatam = Ayatam || {};
Ayatam.SHRINEMAINMENU = Ayatam.SHRINEMAINMENU || {};

/*:
 * @target MV
 * @plugindesc Shrine様専用メインメニューMV v0.01
 * @author Ayatam (Another Young Animations)
 * 
 * @help ■ Shrine様専用メインメニューMV
 * 本プラグインは、MV Core ver 1.6.3 に対応。
 * 
 * 【利用規約】
 * ・改造はご自由に行ってください。
 * ・他サイト様の素材との競合によるエラーには基本、対応しません。
 * ・素材単体でのエラーには対応します。ただし、その責任は負いません。
 * ・アダルト・商業可。
 * 
 * 【素材を使用したゲーム等について】
 * ・作者名、サイト名、URLなどをread_meなどに分かりやすい形で記載してください。
 * 
 *   作者名:ayatam
 *   サイト名:Another Young Animations 公式サイト
 *   URL:https://ayatam.wixsite.com/index
 * 
 * =============================================================================
 *  【プラグイン使用方法】
 *  ・本プラグインにはプラグインコマンド/スクリプトコマンドはありません。
 * 
 *  【本プラグイン専用画像フォルダパス】
 *    img/m_shirne/
 *    本プラグインで使用する画像はすべて、
 *    このフォルダにインポートしてください。
 * 
 * =============================================================================
 * 
 * @param menuSettings
 * @text メインメニュー設定
 * @type struct<MainMenuSettings>
 * @desc メインメニューの設定を行います。
 */

//=============================================================================
//  【MainMenuSettings】
//=============================================================================

/*~struct~MainMenuSettings:
 * @param backImg
 * @text メインメニューの背景設定
 * @type struct<BackgroundImgs>
 * @default {"usePicture":"false","pictureFile":"","pictureX":"0","pictureY":"0","pictureOpacity":"255","pictureAnchor":"false"}
 * @desc メインメニュー全体の背景画像を指定します。
 * 
 */

//=============================================================================
//  【BackgroundImgs】
//=============================================================================

/*~struct~BackgroundImgs:
 * @param usePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param pictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/m_shirne
 * @desc ピクチャーファイルを設定します。
 * 
 * @param pictureX
 * @text ピクチャーのx座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。
 * 
 * @param pictureY
 * @text ピクチャーのy座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。
 * 
 * @param pictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param pictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */


//=============================================================================
//
// - プラグイン本体 - ここから下は変更禁止 -
//
//=============================================================================

//=============================================================================
// プラグイン 初期化
//=============================================================================

//プラグイン名の登録
var AyatamShrineMainMenu = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];

//プラグインパラメータを登録
Ayatam.SHRINEMAINMENU.Parameters = PluginManager.parameters(AyatamShrineMainMenu);
//プラグインパラメータの文字列を配列に変換
Ayatam.SHRINEMAINMENU.Parameters = JSON.parse(JSON.stringify(Ayatam.SHRINEMAINMENU.Parameters,(key,value)=>{
    try{return JSON.parse(value);} catch (e) {}
    return value;
    }
));
//デザイン設定のショートカット
Ayatam.SHRINEMAINMENU.menuSettings = Ayatam.SHRINEMAINMENU.Parameters.menuSettings;

//=============================================================================
// ImageManager
//=============================================================================
ImageManager.loadShrineMenu = function(filename, hue) {
    return this.loadBitmap('img/m_shirne/', filename, hue, true);
};
//=============================================================================
// Window_MenuStatus
//=============================================================================
Window_MenuStatus.prototype.refresh = function() {
    if(!this._bustSprite) {
        this.createBustSprite();
    }else{
        this.eraseBustSprite();
    };
    if (this.contents) {
        this.contents.clear();
        this.drawAllItems();
    }
};

Window_MenuStatus.prototype.createBustSprite = function() {
    this._bustSprite = new Sprite();
};

Window_MenuStatus.prototype.eraseBustSprite = function() {
    if(this._bustSprite.bitmap !== undefined) {
        this.removeChild(this._bustSprite);
        this.createBustSprite();
    };
};

Window_MenuStatus.prototype.drawBustSprite = function() {
    var picture = "Lania";
    this._bustSprite.bitmap = ImageManager.loadShrineMenu(picture);
    this._bustSprite.y = -50;
    this.addChildToBack(this._bustSprite);
};

Window_MenuStatus.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    if(topIndex <= 0) topIndex++;
    this.drawItem(0);
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

Window_MenuStatus.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    if(index <= 0) {
        rect.width = this.itemWidth();
        rect.height = this.contentsHeight();
        rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
        rect.y = 0;
    }else{
        rect.width = this.itemWidth();
        rect.height = this.contentsHeight()/3;
        rect.x = 1 * (rect.width + this.spacing()) - this._scrollX;
        rect.y = Math.floor(index-1) * rect.height - this._scrollY;
    };
    return rect;
};

var _AyatamShrineMainMenu_Window_MenuStatus_prototype_drawItem = Window_MenuStatus.prototype.drawItem;
Window_MenuStatus.prototype.drawItem = function(index) {
    if(Ayatam.SHRINEMAINMENU.menuSettings.menuDesign) {
        this.drawItemBackground(index);
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        var lineHeight = this.lineHeight();
        var guageWidth = 180;
        if(index === 0) {
            this.drawBustSprite();
            this.drawActorName(actor, rect.x, rect.y);
            this.drawNewActorLevel(actor, rect.x, rect.y + lineHeight * 1);
            this.drawActorIcons(actor, rect.x, rect.y + lineHeight * 2);
            this.drawActorHp(actor, rect.x, rect.y + lineHeight * 4, guageWidth);
            this.drawActorMp(actor, rect.x, rect.y + lineHeight * 5, guageWidth);
            this.drawActorParam(actor, rect.x,rect.y + lineHeight * 7,2);
            this.drawActorParam(actor, rect.x,rect.y + lineHeight * 8,3);
            this.drawActorParam(actor, rect.x,rect.y + lineHeight * 9,4);
            this.drawActorParam(actor, rect.x,rect.y + lineHeight * 10,5);
            this.drawActorParam(actor, rect.x,rect.y + lineHeight * 11,6);
            this.drawActorParam(actor, rect.x,rect.y + lineHeight * 12,7);
        }else{
            var iconWidth = Window_Base._iconWidth;
            var iconX = rect.width - iconWidth;
            this.drawItemImageCustom(index);
            this.drawActorName(actor, rect.x, rect.y);
            this.drawNewActorLevel(actor, rect.x, rect.y + lineHeight * 1);
            this.drawVerticalActorIcons(actor, rect.x + iconX, rect.y);
            this.drawActorHp(actor, rect.x + iconWidth, rect.y + (lineHeight * 2) + 15, guageWidth);
            this.drawActorMp(actor, rect.x + iconWidth, rect.y + (lineHeight * 3) + 15, guageWidth);
        };
    }else{
        _AyatamShrineMainMenu_Window_MenuStatus_prototype_drawItem.call(this,index);
    };
};

Window_MenuStatus.prototype.drawNewActorLevel = function(actor, x, y) {
    this.contents.fontSize = 19;
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 44, y, 36);
    this.contents.fontSize = this.standardFontSize();
};

Window_MenuStatus.prototype.drawActorParam = function(actor,x,y,paramId) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, 120);
    this.resetTextColor();
    this.drawText(actor.param(paramId), x + 140, y, 48, 'right');
};

Window_MenuStatus.prototype.drawItemImageCustom = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x + (rect.width/2) - (Window_Base._faceWidth/2);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, x, rect.y - 5, Window_Base._faceWidth, Window_Base._faceHeight + 20);
    this.changePaintOpacity(true);
};

Window_MenuStatus.prototype.drawVerticalActorIcons = function(actor,x,y) {
    var icons = actor.allIcons().slice(0, Math.floor(144 / Window_Base._iconWidth));
    for(var i = 0; i < icons.length; ++i) {
        this.drawIcon(icons[i], x, y + Window_Base._iconHeight * i);
    };
};

Window_MenuStatus.prototype.drawActorLevel = function(actor, x, y) {
    this.contents.fontSize = 19;
    Window_Base.prototype.drawActorLevel.call(this,actor,x,y);
    this.contents.fontSize = this.standardFontSize();
};

Window_MenuStatus.prototype.drawActorHp = function(actor, x, y, width) {
    this.contents.fontSize = 19;
    Window_Base.prototype.drawActorHp.call(this,actor,x,y,width);
    this.contents.fontSize = this.standardFontSize();
};

Window_MenuStatus.prototype.drawActorMp = function(actor, x, y, width) {
    this.contents.fontSize = 19;
    Window_Base.prototype.drawActorMp.call(this,actor,x,y,width);
    this.contents.fontSize = this.standardFontSize();
};

var _AyatamShrineMainMenu_Window_MenuStatus_prototype_selectLast = Window_MenuStatus.prototype.selectLast;
Window_MenuStatus.prototype.selectLast = function() {
    if(Ayatam.SHRINEMAINMENU.menuSettings.menuDesign) {
        if(this.formationMode()) {
            this.select($gameParty.menuActor().index() || 1);
        }else{
            this.select($gameParty.menuActor().index() || 0);
        };
    }else{
        _AyatamShrineMainMenu_Window_MenuStatus_prototype_selectLast.call(this);
    };
};

Window_MenuStatus.prototype.maxPageItems = function() {
    return this.maxPageRows() + 1;
};

Window_MenuStatus.prototype.topIndex = function() {
    return this.topRow();
};

Window_MenuStatus.prototype.maxCols = function() {
    return 2;
};

Window_MenuStatus.prototype.maxRows = function() {
    return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
};

Window_MenuStatus.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0) {
        if (hitIndex === this.index()) {
            if (triggered && this.isTouchOkEnabled()) {
                this.processOk();
            }
        } else if (this.isCursorMovable()) {
            if(!this.formationMode()) {
                this.select(hitIndex);
            }else{ 
                if(hitIndex > 0) {
                    this.select(hitIndex);
                };
            };
        }
    } else if (this._stayCount >= 10) {
        if (y < this.padding) {
            this.cursorUp();
        } else if (y >= this.height - this.padding) {
            this.cursorDown();
        }
    }
    if (this.index() !== lastIndex) {
        SoundManager.playCursor();
    }
};

Window_MenuStatus.prototype.cursorDown = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if(index > 0) {
        if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
            this.select((index + 1) % maxItems);
        }
    };
};

Window_MenuStatus.prototype.cursorUp = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if(index > 1) {
        if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
            this.select((index - 1 + maxItems) % maxItems);
        }
    };
};

Window_MenuStatus.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if(index <= 0) {
        if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
            this.select((index + 1) % maxItems);
        }
    };
};

Window_MenuStatus.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if(index <= 0) {
        if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
            this.select((index - 1 + maxItems) % maxItems);
        }
    }else{
        if(!this.formationMode()) {
            this.select(0);
        };
    };
};

Window_MenuStatus.prototype.cursorPagedown = function() {
    var index = this.index();
    var maxItems = this.maxItems();
    if (this.topRow() + this.maxPageRows() < this.maxRows()) {
        this.setTopRow(this.topRow() + this.maxPageRows());
        this.select(Math.min(index + this.maxPageItems(), maxItems - 1));
    }
};

Window_MenuStatus.prototype.cursorPageup = function() {
    var index = this.index();
    if (this.topRow() > 0) {
        this.setTopRow(this.topRow() - this.maxPageRows());
        this.select(Math.max(index - this.maxPageItems(), 0));
    }
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return 3;
};

Window_MenuStatus.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

Window_MenuStatus.prototype.maxRows = function() {
    if(this.index() === 0) {
        return 0;
    }else{
        return Math.max(Math.ceil(this.maxItems() / 1), 1);
    };
};

Window_MenuStatus.prototype.maxTopRow = function() {
    return Math.max(0, this.maxRows() - this.maxPageRows());
};

Window_MenuStatus.prototype.row = function() {
    if(this.index() === 0) {
        return 0;
    }else{
        return this.index()-1;
    };
};
//=============================================================================
// Scene_Menu
//=============================================================================

var _AyatamShrineMainMenu_Scene_Menu_prototype_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    _AyatamShrineMainMenu_Scene_Menu_prototype_create.call(this);
    if(Ayatam.SHRINEMAINMENU.menuSettings.menuDesign) {
        this.createHelpWindow();
    };
    // console.log("Ayatam.SHRINEMAINMENU.menuSettings",Ayatam.SHRINEMAINMENU.menuSettings);
    // require('nw.gui').Window.get().showDevTools();
    // console.log($gameMap._mapId);
    // this.createCommandWindow();
    // this.createGoldWindow();
    // this.createStatusWindow();
};

Scene_Menu.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help();
    this._helpWindow.setText("調整中");
    // this._helpWindow.setText(this.helpWindowText());
    this.addWindow(this._helpWindow);
    this._commandWindow.y = this._helpWindow.height;
    this._statusWindow.y = this._helpWindow.height;
    this._statusWindow.height = Graphics.height - this._helpWindow.height;
};

var _AyatamShrineMainMenu_Scene_Menu_prototype_onFormationCancel = Scene_Menu.prototype.onFormationCancel;
Scene_Menu.prototype.onFormationCancel = function() {
    _AyatamShrineMainMenu_Scene_Menu_prototype_onFormationCancel.call(this);
    if(Ayatam.SHRINEMAINMENU.menuSettings.menuDesign) {
        $gameParty.setMenuActor($gameParty.members()[0]);
    };
    // if (this._statusWindow.pendingIndex() >= 0) {
    //     this._statusWindow.setPendingIndex(-1);
    //     this._statusWindow.activate();
    // } else {
    //     this._statusWindow.deselect();
    //     this._commandWindow.activate();
    // }
};

//=============================================================================
// プラグイン終了 - End of file
//=============================================================================