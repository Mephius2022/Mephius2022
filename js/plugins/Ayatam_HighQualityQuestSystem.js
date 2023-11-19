//=============================================================================
// plugin name Ayatam_HighQualityQuestSystem.js
// ■ 高機能クエストシステムMVMZ
//                         MV 対応コアver 1.6.3
//                         MZ 対応コアver 1.4.3
//
// (C)2021 ayatam
//=============================================================================
//  【更新内容】
//  2022/04/4 v1.05 マップ中のクエストナビウィンドウの可変背景を
//                  背景画像使用中に限り、無効化するように調整しました。
//                  任意でマップ上のナビゲーターを非表示にした際、
//                  任意指定を維持するように仕様を変更しました。
//                  MZにて失敗モードを実行中にクエストメニューのカテゴリーが
//                  正常に表示されていなかった不具合を修正しました。
//  2022/03/31 v1.04 MZにて特定条件下で操作を遮断される不具合を
//                   修正しました。
//  2022/03/30 v1.03 ゲームパッド操作の機能を追加しました。
//                   競合対策をさらに強化しました。
//                   →以降、競合が発生する場合は
//                    打つ手がないほどの強化になります。
//  2022/03/7 v1.02 RPGツクールMZにて読み込み系の不具合を修正しました。
//  2022/03/4 v1.01 RPGツクールMZにも対応しました。
//                  メニューのタイトルコマンド使用時にクエスト状況を
//                  保持し続けていた不具合を修正しました。
//                  NPC頭上のクエストアイコン表示に機能を追加しました。
//  2021/11/05 v1.00 英語版に対応しました。
//                   クエスト報告可能時のME再生ロジックの仕様を変更しました。
//                   パラメータの名前を見やすくしました。
//                   細かい不具合の修正をしました。
//  2021/10/19 v0.05 β 受注条件の判定を選択できる機能を追加しました。
//                     ※これにより、v0.04 β 以前の
//                      「基本設定」と「カスタマイズ設定」の
//                       バックアップデータを使用することができなくなります。
//                       ご了承ください。
//  2021/10/18 v0.04 β フォントデータ参照処理を調整しました。
//  2021/10/16 v0.03 β 一部の説明文を改修しました。
//                     クエストデータベース用のダミーデータを追加しました。
//                     特定条件下で発生する画像表示遅延の不具合を修正しました。
//  2021/10/14 v0.02 β 有名所の各プラグイン様との競合に対応しました。
//  2021/10/13 v0.01 β テストリリース。
//=============================================================================

var Imported = Imported || {};
Imported.Ayatam_HighQualityQuestSystem = true;

var Ayatam = Ayatam || {};
Ayatam.QUEST = Ayatam.QUEST || {};

//=============================================================================
//
// - 日本語ここから -
//
//=============================================================================

/*:ja
 * @target MV MZ
 * @plugindesc 高機能クエストシステムMVMZ v1.05
 * クエストの管理機能を追加します。
 * @author Ayatam (Another Young Animations)
 * 
 * @help ■ 高機能クエストシステム MVMZ
 * 本プラグインは、MV Core ver 1.6.3 に対応。
 *                 MZ Core ver 1.4.3 に対応。
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
 *  ・プラグインパラメータの基本設定やカスタマイズ設定をお好みの設定にし、
 *    クエストデータベースにクエストを登録することで使用準備が整います。
 *  ・下記を参考の上、スクリプトコマンドを使用し、
 *    ゲーム内でクエストを実装してください。
 *  ・本プラグインにはプラグインコマンドはありません。
 *    スクリプトコマンドのみです。
 * 
 *  【仕様】
 *  ・スマホアプリ用には考慮していません。
 *  ・マップシーン中のウィンドウマスキングを除去しています。
 *    ウィンドウマスキングは、ウィンドウの真下を描画しないための処理です。
 *    マスキングが必要な方は、本プラグインの導入を推奨しません。
 * 
 *  【本プラグイン専用画像フォルダパス】
 *    img/quests/
 *    本プラグインで使用する画像はすべて、
 *    このフォルダにインポートしてください。
 * -----------------------------------------------------------------------------
 *  【クエストデータベースのバックアップの取り方】
 *   1.パラメータのクエストデータベースを開くと、
 *     作成したクエストリストが表示されます。
 * 
 *   2.この状態でテキストタブの方を開き、
 *     そこに記されているコードをコピペし、
 *     メモ帳などに保存することでバックアップ完了です。
 * 
 *  【クエストデータベースのバックアップの読み込み方】
 *   1.バックアップを取ったコードを再度クエストリストが
 *     表示されているテキストタブに貼り付けることで
 *     作成したクエストデータが復元されます。
 * 
 *    ※基本設定とカスタマイズ設定も同じように、
 *      バックアップを取ることが可能です。
 * -----------------------------------------------------------------------------
 *  【カラーコードの有力サイト】
 *  ・RPGツクールMVのシステムカラーのカラーコード表
 *    https://www.ssaits.jp/blog/system/game/tkool/font-color.html
 *  ・カラーコード生成サイト
 *    https://www.peko-step.com/tool/tfcolor.html
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - 画面系 -
 * 
 * =============================================================================
 * 
 *  ●クエストメニューを開く (受注中のクエストリストの画面です)
 *   Ayatam.QUEST.openQuestMenu()
 *   ※クエストを一つでも受注している必要があります。
 * 
 *   ※直接メニューを開く
 *     SceneManager.push(Scene_QuestMenu)
 *   ※直接メニューを開く場合に、
 *     クエストを一つでも受注している条件が必要な場合は、
 *     コマンド選択条件に 以下 のコマンドを使用してください。
 *     $gameQuest.canOpenQuestMenu()
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストボードを開く (受注可能なクエストリストの画面です)
 *   
 *   クエストボードは、未受注かつデータベースの受注条件でボードへの表示条件を
 *   満たしているクエストだけ表示します。
 * 
 * -----------------------------------------------------------------------------
 * 
 *   Ayatam.QUEST.openQuestBoard(id,name,list,mode)
 *   id   : クエストボードのID
 *          0でクエストボードの表示条件をすべて満たしているクエストを
 *          表示します。
 *   name : クエストボードの名前を ''(シングルクォート)で指定。
 *         「クエストシステムの基本設定」のクエストボード名を使用する場合、
 *          null と記入してください。
 *   list : リスト表示条件を id で指定します。
 *          0:「クエストシステムの基本設定」の
 *            「クエスト受注条件の設定 > 受注条件の判定設定」にて
 *             判定指定された受注条件を満たしていればリストに表示されます。
 *          1: 対象クエストが未受注かつ未報告、
 *             未失敗(失敗モード時)であり、尚且つNPC限定ではなく、
 *             且つクエスト受注条件のアクター必須レベルにて
 *             リーダーとして指定されたキャラのレベル条件を
 *             満たしていればリストに表示。
 *          2:「NPC限定」ではないクエストを
 *             受注条件を設定していてもすべて表示します。
 *             ※id:1 のリーダーレベルでの縛りを無くしたものになります。
 *          ※受注条件が未設定の場合は、そのままリストに表示されます。
 *   mode : クエスト選択後、対象クエストの受注条件を、
 *          true:確認し受注するか問う / false:無視し受注するか問う
 * 
 *  【例:1】クエストボード表示可能なすべての未受注かつ未報告で
 *          受注条件のアクターレベルで1番に設定されたキャラのレベルが
 *          条件を満たしていればリストに表示し、
 *          尚且つ選択中のクエストのその他の受注条件を無視し受注するか問う。
 *          Ayatam.QUEST.openQuestBoard(0,null,1,false)
 * 
 *  【例:2】「クエスト データベース - クエスト情報」のクエストボードIDが
 *           1を含むクエストのみ、すべての受注条件を満たしていればリストへ表示し、
 *           選択中のクエストの受注条件の確認をし満たしていれば、受注するか問う。
 *           クエストボード名を はじまりの村の掲示板 に変更する。
 *           Ayatam.QUEST.openQuestBoard(1,'はじまりの村の掲示板',0,true)
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - クエスト受注系 -
 * 
 * =============================================================================
 * 
 *  ●クエストの表示「クエストの受注条件を表示する」
 *   Ayatam.QUEST.showCheckQuest(id,mode)
 *   id   : 「クエスト データベース」の作成順の番号
 *           指定する時は、''(シングルクォート)で囲みます。
 *   mode : 受注条件を満たしていれば、
 *          true: クエストを受注するか問う / false: イベントに引き継ぐ
 *          ※省略で false
 * 
 *  【例:1】「クエスト データベース」の作成順の番号が 1 の場合、
 *          対象のクエストの受注条件を満たしていれば、
 *          クエストを受注するか問う。
 *          Ayatam.QUEST.showCheckQuest('quest1',true)
 * 
 *  【例:2】「クエスト データベース」の作成順の番号が 2 の場合、
 *          対象のクエストの受注条件を満たしていても、
 *          イベントの内容に引き継ぐ。
 *          Ayatam.Quest.showCheckQuest('quest2')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストの表示「クエストの受注条件を表示する」補助コマンド
 *   Ayatam.QUEST.showCheckChoice()
 * 
 *  【例】上記、Ayatam.QUEST.showCheckQuest(id,mode) の
 *        mode が false の時のみ使用可能な補助コマンド
 * 
 *        受注条件画面を表示中に受注条件を満たしている時
 *        決定/キャンセル のどちらが押されたかを
 *        判別するスクリプトコマンドです。
 * 
 *        決定キーが押された時 : 条件が満たされた場合 と判定し、
 *        キャンセルキーが押された時 : それ以外の場合 と判定します。
 * 
 *   ※イベントコマンド・フロー制御「条件分岐」のスクリプトコマンドで使用します。
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストの表示「クエストを受注するか問う」
 *   Ayatam.QUEST.showQuest(id)
 *   id : 「クエスト データベース」の作成順の番号
 *   指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 1 の場合、
 *         クエストの内容を表示し、受注条件を無視し受注するか問う。
 *         Ayatam.QUEST.showQuest('quest1')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストの受注「クエストの受注条件に問わず受注」
 *   Ayatam.QUEST.forceAssent(id)
 *   id : 「クエスト データベース」の作成順の番号
 *   指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 1 の場合、
 *         クエストの内容は表示せず、受注条件を無視し受注する。
 *         Ayatam.QUEST.forceAssent('quest1')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストの報告「報告するかを問う」
 *   Ayatam.QUEST.reportQuest(id)
 *   id : 「クエスト データベース」の作成順の番号
 *   指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 1 の場合、
 *         進行中の対象クエストの目的がすべてクリアしていれば、
 *         対象のクエストを報告するか問う。
 *         報告した場合、クエストそのものをクリア済みにする。
 *         Ayatam.QUEST.reportQuest('quest1')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストの報告「有無を問わず報告」
 *   Ayatam.QUEST.forceReportQuest(id)
 *   id : 「クエスト データベース」の作成順の番号
 *   指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 1 の場合、
 *         クエストの内容は表示せず、目的がすべてクリアしていれば、
 *         有無を問わず報告する。
 *         Ayatam.QUEST.forceReportQuest('quest1')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストの失敗「受注しているクエストを失敗させる」
 *   Ayatam.QUEST.failQuest(id)
 *   id : 「クエスト データベース」の作成順の番号
 *   指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 1 の場合、
 *         有無を問わず失敗させる。
 *         Ayatam.QUEST.failQuest('quest1')
 *   
 *   ※失敗クエストの機能が有効時のみ使用可能
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストの初期化「受注しているクエストに限り、初期化」
 *   Ayatam.QUEST.resetQuest(id)
 *   id : 「クエスト データベース」の作成順の番号
 *   指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 1 の場合、
 *         対象クエストを受注していたら初期化を行う。
 *         Ayatam.QUEST.resetQuest('quest1')
 * 
 *   ※その際、対象の「クエスト データベース」の
 *    「クエスト情報 - 放棄時詳細設定」を利用し初期化します。
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●すべてのクエストを受注する「デバッグ用のため、受注条件は無視されます」
 *   Ayatam.QUEST.getAllQuest()
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●すべてのクエストを初期化する「受注しているすべてのクエストを初期化」
 *   Ayatam.QUEST.resetAllQuest()
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - ナビゲーター系 -
 * 
 * =============================================================================
 * 
 *  ●ナビゲーターの表示 (クエストがナビ設定されている場合のみ)
 *   Ayatam.QUEST.showQuestNavi()
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●ナビゲーターの非表示 (クエストがナビ設定されている場合のみ)
 *   Ayatam.QUEST.hideQuestNavi()
 * 
 *   ※注意※
 *   ナビゲーターを特定イベント中に非表示にした場合、必ず、
 *   対象のイベント終了後に「ナビゲーターの表示」を含めておいてください。
 *   ユーザーが任意で表示/非表示を操作した場合、挙動がおかしくなります。
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●ナビゲーターにクエストが設定されているか？ 「条件分岐」
 *   $gameQuest.questInNavi()
 *   
 *   設定されていれば、true / されていなければ、false を返します。
 * 
 *   ※イベントコマンド・フロー制御「条件分岐」のスクリプトコマンドで使用します。
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - クエストの状態系 - 「条件分岐」
 *  ※イベントコマンド・フロー制御「条件分岐」のスクリプトコマンドで使用します。
 * 
 * =============================================================================
 * 
 *  ●対象のクエストの受注条件を満たしているか？
 *   $gameQuest.canAssent(id)
 *   id : 「クエスト データベース」の作成順の番号
 *         指定する時は、''(シングルクォート)で囲みます。
 *         満たしていれば、true / 満たしていなければ、false を返します。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 3 の場合、
 *         $gameQuest.canAssent('quest3')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●対象のクエストは報告可能か？
 *   $gameQuest.canReport(id)
 *   id : 「クエスト データベース」の作成順の番号
 *         指定する時は、''(シングルクォート)で囲みます。
 *         満たしていれば、true / 満たしていなければ、false を返します。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 3 の場合、
 *         $gameQuest.canReport('quest3')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●対象のクエストを受注しているか？
 *   $gameQuest.isAssented(id)
 *   id : 「クエスト データベース」の作成順の番号
 *         指定する時は、''(シングルクォート)で囲みます。
 *         満たしていれば、true / 満たしていなければ、false を返します。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 3 の場合、
 *         $gameQuest.isAssented('quest3')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●対象のクエストは報告済みか？
 *   $gameQuest.isReported(id)
 *   id : 「クエスト データベース」の作成順の番号
 *         指定する時は、''(シングルクォート)で囲みます。
 *         満たしていれば、true / 満たしていなければ、false を返します。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 3 の場合、
 *         $gameQuest.isReported('quest3')
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド 「quest_obj」 - クエスト進行系 -
 * 
 * =============================================================================
 * 
 *  ●クエストのスクリプトコマンドオブジェクト 「代入」
 *   Ayatam.QUEST.insObj(id,setId,amount)
 *   id     : 「クエスト データベース」の作成順の番号
 *             指定する時は、''(シングルクォート)で囲みます。
 *   setId  : 「クエスト データベース」の「目的設定」の作成順の番号
 *             指定する時は、''(シングルクォート)で囲みます。
 *   amount : 代入数
 * 
 *  【例】「クエスト データベース」の作成順の番号が 2 の場合で代入したい目的が、
 *        「クエスト データベース - 目的設定」の作成順の番号が 1 の場合、
 *         対象の目的数に 20 を代入。
 *         Ayatam.QUEST.insObj('quest2','set1',20)
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストのスクリプトコマンドオブジェクト 「加算」
 *   Ayatam.QUEST.addObj(id,setId,amount)
 *   id     : 「クエスト データベース」の作成順の番号
 *             指定する時は、''(シングルクォート)で囲みます。
 *   setId  : 「クエスト データベース」の「目的設定」の作成順の番号
 *             指定する時は、''(シングルクォート)で囲みます。
 *   amount : 増加数
 * 
 *  【例】「クエスト データベース」の作成順の番号が 3 の場合で代入したい目的が、
 *        「クエスト データベース - 目的設定」の作成順の番号が 4 の場合、
 *         対象の目的数に 5 を増加。
 *         Ayatam.QUEST.addObj('quest3','set4',5)
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストのスクリプトコマンドオブジェクト 「減算」
 *   Ayatam.QUEST.subObj(id,setId,amount)
 *   id     : 「クエスト データベース」の作成順の番号
 *             指定する時は、''(シングルクォート)で囲みます。
 *   setId  : 「クエスト データベース」の「目的設定」の作成順の番号
 *             指定する時は、''(シングルクォート)で囲みます。
 *   amount : 減算数
 * 
 *  【例】「クエスト データベース」の作成順の番号が 1 の場合で代入したい目的が、
 *        「クエスト データベース - 目的設定」の作成順の番号が 2 の場合、
 *         対象の目的数に 40 を減算。
 *         Ayatam.QUEST.subObj('quest1','set2',40)
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストのスクリプトコマンドオブジェクト 「条件:達成状況を求める」
 *   Ayatam.QUEST.questObj(id,setId)
 *   id    : 「クエスト データベース」の作成順の番号
 *            指定する時は、''(シングルクォート)で囲みます。
 *   setId : 「クエスト データベース」の「目的設定」の作成順の番号
 *            指定する時は、''(シングルクォート)で囲みます。
 * 
 *  【例】「クエスト データベース」の作成順の番号が 1 の場合で求めたい目的が、
 *        「クエスト データベース - 目的設定」の作成順の番号が 2 の場合、
 *         Ayatam.QUEST.questObj('quest1','set2')
 * 
 *  【使用例:1】Ayatam.QUEST.questObj('quest1','set2') >= 4
 *              この場合、quest1 の set2 の達成数が4含む超か
 *              含む超であれば、true / より下であれば、false を返します。
 *   ※イベントコマンド・フロー制御「条件分岐」のスクリプトコマンドで使用します。
 * 
 *  【使用例:2】$gameVariables.setValue(1,Ayatam.QUEST.questObj('quest1','set2'))
 *              この場合、quest1 の set2 の達成数が3の場合、
 *              変数ID:1番に 3 を代入。
 *   ※イベントコマンド・上級「スクリプト」で使用します。
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●クエストのスクリプトコマンドオブジェクト 「クリア目的数を変更」
 *   Ayatam.QUEST.objChangeClearAmount(id,setId,amount)
 *   id     : 「クエスト データベース」の作成順の番号
 *             指定する時は、''(シングルクォート)で囲みます。
 *   setId  : 「クエスト データベース」の「目的設定」の作成順の番号
 *             指定する時は、''(シングルクォート)で囲みます。
 *   amount : クリア目的数の変更値
 * 
 *  【例】「クエスト データベース」の作成順の番号が 3 の場合で求めたい目的が、
 *        「クエスト データベース - 目的設定」の作成順の番号が 2 の場合、
 *         クリア目的数を 10 に変更。
 *         Ayatam.QUEST.objChangeClearAmount('quest3','set2',10)
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  スクリプトコマンド - ユーティリティー系 -
 * 
 * =============================================================================
 * 
 *  ●NPCの頭上に対象クエストのクエストアイコンを表示 「注釈」
 *  「イベントページの最初の行に指定してください。」
 *   <quest: id, x, y>
 *   id : 「クエスト データベース」の作成順の番号
 *         この指定のみ、''(シングルクォート)で囲みません。
 *   x  :  アイコンのx座標 イベント対象からの調整値。
 *   y  :  アイコンのy座標 イベント対象からの調整値。
 * 
 *   ※対象のアイコンは、指定クエストが未受注 の時だけ、
 *     対象に指定クエストのクエストアイコンを表示し、受注と同時に
 *     非表示になります。
 *     また対象のクエストが 報告可能 且つ 未報告時 の時だけ、
 *     「クエストシステムの基本設定 - クエストクリア時のアイコン」を表示します。
 * 
 *  【使用例:1】<quest: quest1, 0, 0>
 *              この場合、 quest1 が受注可能になった際、
 *              対象のイベントの頭上に quest1 のクエストアイコンを表示します。
 * 
 *  【使用例:2】<quest: quest1, -10, -10>
 *              この場合、 quest1 が受注可能になった際、
 *              対象のイベントの頭上に quest1 のクエストアイコンを
 *              対象のイベントの座標から指定座標分調整して表示します。
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●NPCの頭上に対象クエストのクエストアイコンを表示 「注釈」
 *  「イベントページの最初の行に指定してください。」
 *   <questStay: id, x, y>
 *   id : 「クエスト データベース」の作成順の番号
 *         この指定のみ、''(シングルクォート)で囲みません。
 *   x  :  アイコンのx座標 イベント対象からの調整値。
 *   y  :  アイコンのy座標 イベント対象からの調整値。
 * 
 *   ※対象のアイコンは、指定クエストが受注可能且つ進行中 の時だけ、
 *     対象に指定クエストのクエストアイコンを表示し、受注と同時に
 *     非表示になります。
 *     また対象のクエストが 報告可能 且つ 未報告時 の時だけ、
 *     「クエストシステムの基本設定 - クエストクリア時のアイコン」を表示します。
 * 
 *  【使用例:1】<questStay: quest1, 0, 0>
 *              この場合、 quest1 が受注可能且つ進行中になった際、
 *              対象のイベントの頭上に quest1 のクエストアイコンを表示します。
 * 
 *  【使用例:2】<questStay: quest1, -10, -10>
 *              この場合、 quest1 が受注可能且つ進行中になった際、
 *              対象のイベントの頭上に quest1 のクエストアイコンを
 *              対象のイベントの座標から指定座標分調整して表示します。
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●NPCの頭上に対象クエストの指定目的の進行中アイコンを表示 「注釈」
 *  「イベントページの最初の行に指定してください。」
 *   <questObj: id, setId, x, y>
 *   id     : 「クエスト データベース」の作成順の番号
 *             この指定のみ、''(シングルクォート)で囲みません。
 *   setId  :  目的id を指定します。
 *             この指定のみ、''(シングルクォート)で囲みません。
 *   x      :  アイコンのx座標 イベント対象からの調整値。
 *   y      :  アイコンのy座標 イベント対象からの調整値。
 * 
 *   ※対象のアイコンは、指定クエスト受注後 で 未報告 且つ 指定目的 が 未クリア の時だけ、
 *     対象に「クエストシステムの基本設定 - クエスト進行時のアイコン」を表示し、
 *     指定目的 が クリア と判定次第、非表示になります。
 * 
 *  【使用例:1】<questObj: quest1, set1, 0, 0>
 *              この場合、 quest1 が受注され対象目的が起動状態になった際、
 *              対象のイベントの頭上に進行時アイコンを表示します。
 * 
 *  【使用例:2】<questObj: quest1, set1, +10, -20>
 *              この場合、 quest1 が受注され対象目的が起動状態になった際、
 *              対象のイベントの頭上に進行時アイコンを
 *              対象のイベントの座標から指定座標分調整して表示します。
 * 
 *   ※このスクリプトコマンドは、ルートクエスト時は、
 *     対象目的の起動判定を元に順番に表示されます。
 * 
 * =============================================================================
 *
 * @param GlobalSettings
 * @text 基本設定
 * @type struct<QuestGlobalSettings>
 * @default {"Setup":"","FailingQuestMode":"false","NoNaviQuestMode":"false","MenuCommandInformation":"{\"AddToMenuCommand\":\"true\",\"QuestMenuCommandName\":\"クエスト\"}","FontSetup":"{\"FontName\":\"\",\"FontSize\":\"16\"}","ShowQuestLevelUp":"false","QuestMenuConditionCategory":"{\"CategoryIconAll\":\"187\",\"CategoryNameAll\":\"All\",\"CategoryIconActive\":\"189\",\"CategoryNameActive\":\"進行中のクエスト\",\"CategoryIconCleared\":\"191\",\"CategoryNameCleared\":\"クリア済みのクエスト\",\"CategoryIconFailed\":\"194\",\"CategoryNameFailed\":\"失敗したクエスト\"}","QuestMenuQuestCategory":"{\"CategoryID\":\"[\\\"cat0\\\",\\\"cat1\\\",\\\"cat2\\\",\\\"cat3\\\"]\",\"CategoryName\":\"[\\\"All\\\",\\\"会話\\\",\\\"収集\\\",\\\"討伐\\\"]\"}","QuestFlags":"[\"ストーリークエスト\",\"会話クエスト\",\"収集クエスト\",\"討伐クエスト\"]","QuestAssentCommand":"[\"受注\",\"キャンセル\"]","QuestCancelCommand":"[\"放棄\",\"キャンセル\"]","QuestReportCommand":"[\"報告\",\"キャンセル\"]","QuestActiveFlag":"193","QuestClearFlag":"79","BoardSetup":"","QuestBoardName":"クエストボード","QuestBoardListLabels":"[\"クエスト名\",\"カテゴリー\",\"難易度\"]","QuestNeededConditionSetup":"","QuestSelectRequirement":"{\"UseActorLevel\":\"true\",\"UseNeededMember\":\"true\",\"UseOutedMember\":\"true\",\"UseMaxMember\":\"true\",\"UseSw\":\"true\",\"UseVal\":\"true\",\"UseQuestAssented\":\"true\",\"UseQuestReported\":\"true\"}","QuestNeededLabel":"受注条件","QuestNoneNeededLabel":"不問","QuestNeededListMark":"・","QuestNeededLvlLabel":"[\"受注可能レベル\",\"Lv.\"]","QuestNeededMaxMemberLabel":"上限人数","QuestNeededInMemberLabel":"必要メンバー","QuestNeededOutMemberLabel":"除外メンバー","QuestNeededMustAssentLabel":"を受注","QuestNeededMustClearLabel":"をクリア","QuestNeededNotAvailableLabel":"受注条件を満たしておりません。","QuestMenuSetup":"","QuestMenuHelp":"\"←→:カテゴリー / ↑↓:選択 / QW(LB/RB):内容切り替え / D(RT):フィルタリング / A(LT):ナビ設定 / S(back):破棄\"","QuestMenuFilterKey":"D","QuestMenuPadFilterKey":"rt","QuestMenuNaviKey":"A","QuestMenuPadNaviKey":"lt","QuestMenuCancelKey":"S","QuestMenuPadCancelKey":"back","QuestConditionIcons":"[\"193\",\"191\",\"194\"]","QuestNaviCommandName":"[\"ナビ設定\",\"ナビ解除\",\"キャンセル\"]","QuestDataSetup":"","QuestDataPageKey":"{\"PageUpKey\":\"pageup\",\"PageDownKey\":\"pagedown\",\"PageChangeSound\":\"Book2\"}","QuestDataPageUpLabel":"{\"PageUpIcon\":\"187\",\"PageUpKeyLabel\":\":Q(LB)\"}","QuestDataPageDownLabel":"{\"PageDownIcon\":\"189\",\"PageDownKeyLabel\":\"W(RB):\"}","QuestDataDifficultySetup":"{\"IconPacks\":\"[\\\"5,5,5,5,5\\\",\\\"4,4,4,4\\\",\\\"3,3,3\\\",\\\"2,2\\\",\\\"1\\\"]\",\"TextColor\":\"18\"}","QuestDataInfoLabel":"[\"詳細情報\",\"目的\"]","QuestDataClientLabel":"依頼者","QuestDataLocationLabel":"{\"LocationLabelName\":\"依頼場所\",\"LocationLabelIcon\":\"190\"}","QuestDataQuestAreaLabel":"{\"LocationLabelName\":\"主な活動場所\",\"LocationLabelIcon\":\"190\"}","QuestDataContentLabel":"概要","QuestDataRewardLabel":"{\"RewardLabelName\":\"報酬\",\"RewardExpIcon\":\"77\",\"RewardExpUnit\":\"EXP\",\"RewardGoldIcon\":\"313\",\"RewardGoldUnit\":\"G\"}","QuestNaviSetup":"","QuestNaviMapSceneKey":"{\"UseMapKey\":\"true\",\"MapSceneKey\":\"D\",\"MapScenePadKey\":\"rt\"}","QuestOtherSounds":"","QuestAssentedSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Book2\"}","QuestGetSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Item1\"}","QuestLostSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Miss\"}","QuestObjClearSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Item\"}","QuestReportSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Victory1\"}","QuestFailedSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Gag3\"}"}
 * @desc クエストシステムの基本設定を行います。
 * 
 * @param CustamizeSettings
 * @text カスタマイズ設定
 * @type struct<QuestCustamizeSettings>
 * @default {"DefaultDesigns":"","WindowSets":"{\"UseAll\":\"true\",\"UseBoard\":\"true\",\"UseNeeded\":\"true\",\"UseData\":\"true\"}","BoardSet":"{\"Set1\":\"33\",\"Set2\":\"35\",\"Set3\":\"14\",\"Set4\":\"49\",\"Set5\":\"80\"}","NeededSet":"{\"Set1\":\"33\",\"Set2\":\"34\",\"Set3\":\"70\",\"Set4\":\"0\",\"Set5\":\"110\",\"Set6\":\"170\",\"Set7\":\"190\",\"Set8\":\"110\",\"Set9\":\"190\",\"Set10\":\"0\",\"Set11\":\"38\",\"Set12\":\"170\",\"Set13\":\"0\",\"Set14\":\"38\",\"Set15\":\"190\",\"Set16\":\"33\",\"Set17\":\"34\",\"Set18\":\"70\",\"Set19\":\"-40\"}","DataSet":"{\"Set1\":\"33\",\"Set2\":\"34\",\"Set3\":\"70\",\"Set4\":\"71\",\"Set5\":\"34\",\"Set6\":\"105\",\"Set7\":\"76\",\"Set8\":\"139\",\"Set9\":\"144\",\"Set10\":\"230\",\"Set11\":\"139\",\"Set12\":\"240\",\"Set13\":\"180\",\"Set14\":\"182\",\"Set15\":\"34\",\"Set16\":\"279\",\"Set17\":\"281\",\"Set18\":\"34\",\"Set19\":\"142\"}","TextColors":"","HeadingColor":"#99ccff","DealOkColor":"#00e060","DealNoColor":"#ff2020","NaviColor":"#83ff83","AreaColor":"#83ff83","ExpGoldColor":"#84a9ff","BoardWindowSetup":"","BoardWindow":"{\"MainX\":\"45\",\"MainY\":\"28\",\"MainWidth\":\"726\",\"MainHeight\":\"556\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"255\",\"ListX\":\"60\",\"ListY\":\"120\",\"ListWidth\":\"696\",\"ListHeight\":\"422\",\"ListOpacity\":\"0\",\"ListBackOpacity\":\"0\",\"BoardBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","BoardData":"{\"titleX\":\"0\",\"titleY\":\"0\",\"titleFontSize\":\"26\",\"allLabelY\":\"10\",\"questNameX\":\"95\",\"questCategoryX\":\"280\",\"questDifficultyX\":\"195\",\"listNameX\":\"0\",\"listCategoryX\":\"0\",\"listDifficultyX\":\"0\"}","MustWindowSetup":"","MustWindow":"{\"MainX\":\"0\",\"MainY\":\"72\",\"MainWidth\":\"408\",\"MainHeight\":\"468\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\",\"SubX\":\"408\",\"SubY\":\"72\",\"SubWidth\":\"408\",\"SubHeight\":\"468\",\"SubOpacity\":\"255\",\"SubBackOpacity\":\"192\",\"MustBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","MustData":"{\"flagX\":\"0\",\"flagY\":\"0\",\"flagFontSize\":\"14\",\"questNameX\":\"0\",\"questNameY\":\"0\",\"questNameFontSize\":\"26\",\"questDifficultyX\":\"0\",\"questDifficultyY\":\"0\",\"maxMemberX\":\"0\",\"maxMemberY\":\"0\",\"actorLevelX\":\"0\",\"actorLevelY\":\"0\",\"actorLevelNumberX\":\"0\",\"actorLevelNumberY\":\"0\",\"actorNeedX\":\"0\",\"actorNeedY\":\"230\",\"actorOutX\":\"190\",\"actorOutY\":\"230\",\"subPageTitleX\":\"0\",\"subPageTitleY\":\"0\",\"subPageTitleFontSize\":\"14\",\"subPageAreaX\":\"0\",\"subPageAreaY\":\"0\",\"subPageSwX\":\"0\",\"subPageSwY\":\"0\",\"subPageValX\":\"0\",\"subPageValY\":\"0\",\"subPageAssentedX\":\"0\",\"subPageAssentedY\":\"0\",\"subPageReportedX\":\"0\",\"subPageReportedY\":\"0\",\"subPageDetailX\":\"0\",\"subPageDetailY\":\"380\"}","DataWindowSetup":"","DataWindow":"{\"DataX\":\"164\",\"DataY\":\"28\",\"DataWidth\":\"488\",\"DataHeight\":\"568\",\"DataOpacity\":\"255\",\"DataBackOpacity\":\"192\",\"DataBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","QuestDatas":"{\"flagX\":\"0\",\"flagY\":\"0\",\"flagFontSize\":\"26\",\"DifficultyX\":\"0\",\"DifficultyY\":\"0\",\"DifficultyIconX\":\"0\",\"DifficultyIconY\":\"0\",\"DifficultyIconW\":\"-26\",\"QuestNameX\":\"0\",\"QuestNameY\":\"0\",\"QuestNameFontSize\":\"26\",\"PageLabelX\":\"0\",\"PageLabelY\":\"0\",\"PageLabelPageX\":\"0\",\"PageLabelPageY\":\"0\",\"PageUpKeyX\":\"0\",\"PageUpKeyY\":\"0\",\"PageUpKeyIconY\":\"0\",\"PageDownKeyX\":\"0\",\"PageDownKeyY\":\"0\",\"PageDownKeyIconY\":\"0\",\"LocationLabelX\":\"0\",\"LocationLabelY\":\"0\",\"LocationX\":\"0\",\"LocationY\":\"0\",\"ClientLabelX\":\"0\",\"ClientLabelY\":\"0\",\"ClientX\":\"0\",\"ClientY\":\"0\",\"ContentLabelX\":\"0\",\"ContentLabelY\":\"0\",\"ContentX\":\"0\",\"ContentY\":\"0\",\"RewardLabelX\":\"0\",\"RewardLabelY\":\"0\",\"RewardExpX\":\"0\",\"RewardExpY\":\"0\",\"RewardGoldX\":\"0\",\"RewardGoldY\":\"0\",\"RewardItemX\":\"0\",\"RewardItemY\":\"0\",\"RewardItemDrawMode\":\"true\",\"RewardItemSecondX\":\"220\"}","NavWindowSetup":"","NavWindow":"{\"NavX\":\"408\",\"NavY\":\"0\",\"NavWidth\":\"408\",\"NavHeight\":\"624\",\"NavOpacity\":\"0\",\"NavBackOpacity\":\"0\",\"NavBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","NavData":"{\"QuestNameX\":\"0\",\"QuestNameY\":\"0\",\"AreaLabelX\":\"0\",\"AreaLabelY\":\"0\",\"AreaX\":\"0\",\"AreaY\":\"0\",\"ObjectiveX\":\"0\",\"ObjectiveY\":\"0\"}","QuestMenuSetup":"","MenuWindow":"{\"HelpWindowX\":\"0\",\"HelpWindowY\":\"566\",\"HelpWindowWidth\":\"816\",\"HelpWindowHeight\":\"58\",\"HelpWindowOpacity\":\"255\",\"HelpWindowBackOpacity\":\"192\",\"IconCategoryX\":\"0\",\"IconCategoryY\":\"0\",\"IconCategoryWidth\":\"326.4\",\"IconCategoryHeight\":\"102\",\"IconCategoryOpacity\":\"255\",\"IconCategoryBackOpacity\":\"192\",\"IconCategoryLabelX\":\"53.2\",\"IconCategoryLabelY\":\"36\",\"IconCategoryLabelWidth\":\"220\",\"IconCategoryLabelHeight\":\"78\",\"IconCategoryLabelOpacity\":\"0\",\"IconCategoryLabelBackOpacity\":\"0\",\"QuestListX\":\"0\",\"QuestListY\":\"102\",\"QuestListWidth\":\"326.4\",\"QuestListHeight\":\"464\",\"QuestListOpacity\":\"255\",\"QuestListBackOpacity\":\"192\",\"QuestDataX\":\"327.4\",\"QuestDataY\":\"0\",\"QuestDataWidth\":\"488\",\"QuestDataHeight\":\"566\",\"QuestDataOpacity\":\"255\",\"QuestDataBackOpacity\":\"192\",\"QuestMenuImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","AllCommandSetup":"","MenuCommand":"{\"AssentingX\":\"288\",\"AssentingY\":\"258\",\"AssentingOpacity\":\"255\",\"AssentingBackOpacity\":\"255\",\"AssentingBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\",\"ReportingX\":\"288\",\"ReportingY\":\"258\",\"ReportingOpacity\":\"255\",\"ReportingBackOpacity\":\"255\",\"ReportingBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\",\"FilterX\":\"288\",\"FilterY\":\"204\",\"FilterOpacity\":\"255\",\"FilterBackOpacity\":\"255\",\"FilterBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\",\"NavCommandX\":\"288\",\"NavCommandY\":\"258\",\"NavCommandOpacity\":\"255\",\"NavCommandBackOpacity\":\"255\",\"NavCommandBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\",\"CancelingX\":\"288\",\"CancelingY\":\"258\",\"CancelingOpacity\":\"255\",\"CancelingBackOpacity\":\"255\",\"CancelingBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}"}
 * @desc クエストシステムのウィンドウや背景画像導入など様々なカスタマイズ設定を行います。
 * 
 * @param QuestDatabase
 * @text クエスト データベース
 * @type struct<QuestDatabase>[]
 * @default ["{\"QuestInfo\":\"\",\"QuestName\":\"エスターのお願い\",\"QuestFlagID\":\"0\",\"RootQuest\":\"false\",\"QuestIconSetting\":\"{\\\"QuestIconID\\\":\\\"2\\\",\\\"QuestIconX\\\":\\\"0\\\",\\\"QuestIconY\\\":\\\"0\\\"}\",\"QuestBoardID\":\"[\\\"0\\\"]\",\"NpcOnly\":\"false\",\"QuestCategory\":\"[\\\"cat2\\\"]\",\"QuestDifficulty\":\"{\\\"DifficultyText\\\":\\\"\\\",\\\"TextX\\\":\\\"0\\\",\\\"TextY\\\":\\\"0\\\",\\\"IconsetID\\\":\\\"0\\\"}\",\"QuestClient\":\"{\\\"QuestClientName\\\":\\\"エスター\\\",\\\"QuestLocation\\\":\\\"ガルシア帝国\\\",\\\"QuestClientSprite\\\":\\\"{\\\\\\\"SpriteName\\\\\\\":\\\\\\\"Actor1\\\\\\\",\\\\\\\"SpriteIndex\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SpriteX\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SpriteY\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"QuestClientPicture\\\":\\\"{\\\\\\\"UsePicture\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"PictureFile\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"PictureX\\\\\\\":\\\\\\\"220\\\\\\\",\\\\\\\"PictureY\\\\\\\":\\\\\\\"200\\\\\\\",\\\\\\\"PictureOpacity\\\\\\\":\\\\\\\"255\\\\\\\",\\\\\\\"PictureAnchor\\\\\\\":\\\\\\\"false\\\\\\\"}\\\"}\",\"DailyQuest\":\"true\",\"AutoReport\":\"false\",\"QuestActivateSetup\":\"\",\"QuestCancelSetup\":\"{\\\"CancelLock\\\":\\\"false\\\",\\\"CancelSelfSw\\\":\\\"\\\",\\\"CancelSw\\\":\\\"\\\",\\\"CancelVal\\\":\\\"\\\"}\",\"QuestClearedSetup\":\"{\\\"ClearedSelfSw\\\":\\\"\\\",\\\"ClearedSw\\\":\\\"\\\",\\\"ClearedVal\\\":\\\"\\\",\\\"ClearedCommonEvent\\\":\\\"2\\\"}\",\"QuestFailedSetup\":\"{\\\"FailedSelfSw\\\":\\\"\\\",\\\"FailedSw\\\":\\\"\\\",\\\"FailedVal\\\":\\\"\\\",\\\"FailedCommonEvent\\\":\\\"1\\\"}\",\"QuestOrderConditions\":\"\",\"ActorLevel\":\"[\\\"{\\\\\\\"Actor\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"ActorLevel\\\\\\\":\\\\\\\"3\\\\\\\"}\\\",\\\"{\\\\\\\"Actor\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"ActorLevel\\\\\\\":\\\\\\\"42\\\\\\\"}\\\",\\\"{\\\\\\\"Actor\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"ActorLevel\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Actor\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"ActorLevel\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"NeedMembers\":\"[\\\"3\\\",\\\"1\\\",\\\"4\\\"]\",\"OutMembers\":\"[\\\"2\\\"]\",\"MaxMember\":\"3\",\"SwitchConditions\":\"[\\\"{\\\\\\\"SwID\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"SwBoolean\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"SwID\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"SwBoolean\\\\\\\":\\\\\\\"false\\\\\\\"}\\\"]\",\"ValConditions\":\"[\\\"{\\\\\\\"Val\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"ValCondition\\\\\\\":\\\\\\\"just\\\\\\\",\\\\\\\"ValValue\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"Val\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"ValCondition\\\\\\\":\\\\\\\"lt\\\\\\\",\\\\\\\"ValValue\\\\\\\":\\\\\\\"50\\\\\\\"}\\\"]\",\"NeedAssentedQuests\":\"[]\",\"NeedClearedQuests\":\"[]\",\"QuestInfos\":\"\",\"PlaceInformation\":\"ファーム工場\",\"QuestContent\":\"\\\"工場の地下に住みついた魔物を倒してください…。\\\"\",\"QuestClearContent\":\"\",\"QuestObjectiveSettings\":\"[\\\"{\\\\\\\"ObjectiveIcons\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"ObjectiveActivatedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"67\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveClearedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"72\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveFailedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveTypes\\\\\\\":\\\\\\\"questobj\\\\\\\",\\\\\\\"ObjectiveID\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"TargetEnemyID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetValID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetItemID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetQuestID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveContent\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ガルシア帝国のエスターと会話\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ObjectiveFinishAmount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"ClearCommonEvent\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"{\\\\\\\"ObjectiveIcons\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"ObjectiveActivatedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"67\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveClearedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"72\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveFailedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveTypes\\\\\\\":\\\\\\\"killquest\\\\\\\",\\\\\\\"ObjectiveID\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"TargetEnemyID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetValID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetItemID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetQuestID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveContent\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ファーム工場の外に生息する\\\\\\\\\\\\\\\\nこうもりを討伐\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ObjectiveFinishAmount\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"ClearCommonEvent\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"{\\\\\\\"ObjectiveIcons\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"ObjectiveActivatedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"67\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveClearedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"72\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveFailedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveTypes\\\\\\\":\\\\\\\"itemquest\\\\\\\",\\\\\\\"ObjectiveID\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"TargetEnemyID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetValID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetItemID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"UseWitchItem\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"SelectedItem\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"SelectedWeapon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"SelectedArmor\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetQuestID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveContent\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"ポーションを5つ獲得する\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ObjectiveFinishAmount\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"ClearCommonEvent\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\",\"QuestRewards\":\"\",\"QuestRewardGold\":\"5000\",\"QuestLoseGold\":\"0\",\"QuestRewardExp\":\"400\",\"QuestLoseExp\":\"0\",\"QuestRewardItem\":\"[\\\"{\\\\\\\"UseWitchItem\\\\\\\":\\\\\\\"Weapon\\\\\\\",\\\\\\\"SelectedItem\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SelectedWeapon\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"SelectedArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Amount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"UseWitchItem\\\\\\\":\\\\\\\"Armor\\\\\\\",\\\\\\\"SelectedItem\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SelectedWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SelectedArmor\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"UseWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"SelectedItem\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"SelectedWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SelectedArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Amount\\\\\\\":\\\\\\\"10\\\\\\\"}\\\"]\",\"QuestLoseItem\":\"\"}"]
 * @desc クエストの新規作成・編集・削除を行います。※このクエストリストの順番がquestIDになります。【例】quest1,quest2...etc
 */

//=============================================================================
//  【QuestGlobalSettings】
//=============================================================================

/*~struct~QuestGlobalSettings:ja
 * @param Setup
 * @text 初期設定
 * 
 * @param BoardSetup
 * @text クエストボードの設定
 * 
 * @param QuestNeededConditionSetup
 * @text クエスト受注条件の設定
 * 
 * @param QuestMenuSetup
 * @text クエストメニューの設定
 * 
 * @param QuestDataSetup
 * @text クエスト詳細の設定
 * 
 * @param QuestNaviSetup
 * @text クエストナビゲーターの設定
 * 
 * @param QuestOtherSounds
 * @text 特殊効果音の設定
 * 
 * @param FailingQuestMode
 * @text 失敗クエストの機能
 * @parent Setup
 * @type boolean
 * @on 機能を使用する
 * @off 機能を使用しない
 * @default false
 * @desc デフォルトでは、失敗するクエストの機能がありません。この機能で失敗する機能を有効化します。
 * 
 * @param NoNaviQuestMode
 * @text クエストナビゲーターの機能
 * @parent Setup
 * @type boolean
 * @on Navi無効化
 * @off Navi有効化
 * @default false
 * @desc クエストナビゲーターの機能を有効化/無効化できます。無効化時はナビゲーターの概念が無くなります。
 * 
 * @param MenuCommandInformation
 * @text メニューに追加
 * @parent Setup
 * @type struct<QuestMenuCommandInfomation>
 * @desc メニューに「クエスト」コマンドを追加する。
 * 
 * @param FontSetup
 * @text クエスト関係全般の文字設定
 * @parent Setup
 * @type struct<FontInfomation>
 * @desc クエスト全般で使用する書式と文字サイズの指定。
 * 
 * @param ShowQuestLevelUp
 * @text レベルアップの表示
 * @parent Setup
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * @desc クエストシステムからのレベルアップ時に限定
 * 
 * @param QuestMenuConditionCategory
 * @text クエストメニューの進行状態カテゴリー
 * @parent Setup
 * @type struct<QuestMenuConditionCategorySetup>
 * @desc クエストメニュー時の進行状態カテゴリーの設定です。【例】All、進行中、クリア済み、失敗クエスト(※失敗モード時)
 * 
 * @param QuestMenuQuestCategory
 * @text クエストメニューのクエストカテゴリー
 * @parent Setup
 * @type struct<QuestMenuQuestCategorySetup>
 * @desc クエストそのもののカテゴリー設定です。【例】All、会話、収集、討伐
 * 
 * @param QuestFlags
 * @text フラッグラベルの設定
 * @parent Setup
 * @type string[]
 * @default ["ストーリークエスト","会話クエスト","収集クエスト","討伐クエスト"]
 * @desc クエスト詳細画面のヘッダーに表示される名前です。クエストデータベースのフラッグIDとして使用。登録順にIDが、0、1、2...etc
 * 
 * @param QuestAssentCommand
 * @text 受注コマンド名の設定
 * @parent Setup
 * @type string[]
 * @default ["受注","キャンセル"]
 * @desc 受注コマンド時の名前を指定します。1は受注用、2はキャンセル用
 * 
 * @param QuestCancelCommand
 * @text 放棄コマンド名の設定
 * @parent Setup
 * @type string[]
 * @default ["放棄","キャンセル"]
 * @desc 放棄コマンド時の名前を指定します。1は放棄用、2はキャンセル用
 * 
 * @param QuestReportCommand
 * @text 報告コマンド名の設定
 * @parent Setup
 * @type string[]
 * @default ["報告","キャンセル"]
 * @desc 報告コマンド時の名前を指定します。1は報告用、2はキャンセル用
 * 
 * @param QuestActiveFlag
 * @text クエスト進行時のアイコン
 * @parent Setup
 * @type number
 * @default 193
 * @desc ヘルプの「NPCの頭上にクエストアイコンを表示」で進行中の際のアイコン。アイコンリスト:テキストタブの入力欄で右クリ。
 * 
 * @param QuestClearFlag
 * @text クエストクリア時のアイコン
 * @parent Setup
 * @type number
 * @default 79
 * @desc ヘルプの「NPCの頭上にクエストアイコンを表示」で報告可能の際のアイコン。アイコンリスト:テキストタブの入力欄で右クリ。
 * 
 * @param QuestBoardName
 * @text クエストボード名
 * @parent BoardSetup
 * @type string
 * @default クエストボード
 * @desc クエストボードのデフォルト名を指定します。
 * 
 * @param QuestBoardListLabels
 * @text クエストリストのラベル設定
 * @parent BoardSetup
 * @type string[]
 * @default ["クエスト名","カテゴリー","難易度"]
 * @desc クエストボード時のリストラベル名を指定します。1はクエスト名用、2はカテゴリー用、3は難易度用
 * 
 * @param QuestSelectRequirement
 * @text 受注条件の判定設定
 * @parent QuestNeededConditionSetup
 * @type struct<QuestRequirementSetups>
 * @default {"UseActorLevel":"true","UseNeededMember":"true","UseOutedMember":"true","UseMaxMember":"true","UseSw":"true","UseVal":"true","UseQuestAssented":"true","UseQuestReported":"true"}
 * @desc 受注条件として使用する項目の設定
 * 
 * @param QuestNeededLabel
 * @text 受注条件のラベル名
 * @parent QuestNeededConditionSetup
 * @type string
 * @default 受注条件
 * @desc 受注条件画面のラベル名に使用する名前を指定します。
 * 
 * @param QuestNoneNeededLabel
 * @text 不問時のラベル名
 * @parent QuestNeededConditionSetup
 * @type string
 * @default 不問
 * @desc 受注条件の項目がそれぞれ不問時に表示される名前です。
 * 
 * @param QuestNeededListMark
 * @text 項目マークの設定
 * @parent QuestNeededConditionSetup
 * @type string
 * @default ・
 * @desc 受注条件の2ページ目に表示されるリストの項目マークになります。
 * 
 * @param QuestNeededLvlLabel
 * @text 受注可能なレベルのラベル名
 * @parent QuestNeededConditionSetup
 * @type string[]
 * @default ["受注可能レベル","Lv."]
 * @desc 受注条件画面の必要レベルの表示名になります。1は見出しラベル、2はレベルの表記 【例】「Lv.3」
 * 
 * @param QuestNeededMaxMemberLabel
 * @text 同行可能メンバー数のラベル名
 * @parent QuestNeededConditionSetup
 * @type string
 * @default 上限人数
 * @desc 受注条件の同行可能人数の表示名になります。
 * 
 * @param QuestNeededInMemberLabel
 * @text 必要メンバーのラベル名
 * @parent QuestNeededConditionSetup
 * @type string
 * @default 必要メンバー
 * @desc 受注条件の必要メンバーの表示名になります。
 * 
 * @param QuestNeededOutMemberLabel
 * @text 除外メンバーのラベル名
 * @parent QuestNeededConditionSetup
 * @type string
 * @default 除外メンバー
 * @desc 受注条件の除外メンバーの表示名になります。
 * 
 * @param QuestNeededMustAssentLabel
 * @text 受注必須クエストの小尾のラベル名
 * @parent QuestNeededConditionSetup
 * @type string
 * @default を受注
 * @desc 受注条件画面の2ページ目に表示される必須受注クエストの小尾として表示されます。
 * 
 * @param QuestNeededMustClearLabel
 * @text クリア必須クエストの小尾のラベル名
 * @parent QuestNeededConditionSetup
 * @type string
 * @default をクリア
 * @desc 受注条件画面の2ページ目に表示される必須クリアクエストの小尾として表示されます。
 * 
 * @param QuestNeededNotAvailableLabel
 * @text 受注条件を満たしていないラベル名
 * @parent QuestNeededConditionSetup
 * @type string
 * @default 受注条件を満たしておりません。
 * @desc 受注条件を満たしていない際に2ページ目に表示されます。
 * 
 * @param QuestMenuHelp
 * @text クエストメニュー時のヘルプ内容
 * @parent QuestMenuSetup
 * @type string
 * @default "←→:カテゴリー / ↑↓:選択 / QW(LB/RB):内容切り替え / D(RT):フィルタリング / A(LT):ナビ設定 / S(back):破棄"
 * @desc クエストメニュー時のヘルプ内容として使用されます。
 * 
 * @param QuestMenuFilterKey
 * @text フィルタリングキーの設定
 * @parent QuestMenuSetup
 * @type select
 * @option Aキー
 * @value A
 * @option Bキー
 * @value B
 * @option Cキー
 * @value C
 * @option Dキー
 * @value D
 * @option Eキー
 * @value E
 * @option Fキー
 * @value F
 * @option Gキー
 * @value G
 * @option Hキー
 * @value H
 * @option Iキー
 * @value I
 * @option Jキー
 * @value J
 * @option Kキー
 * @value K
 * @option Lキー
 * @value L
 * @option Mキー
 * @value M
 * @option Nキー
 * @value N
 * @option Oキー
 * @value O
 * @option Pキー
 * @value P
 * @option Qキー
 * @value pageup
 * @option Rキー
 * @value R
 * @option Sキー
 * @value S
 * @option Tキー
 * @value T
 * @option Uキー
 * @value U
 * @option Vキー
 * @value V
 * @option Wキー
 * @value pagedown
 * @option Yキー
 * @value Y
 * @default D
 * @desc クエストメニュー時のフィルタリングメニューを表示するキーを指定します。
 * 
 * @param QuestMenuPadFilterKey
 * @text [パッド]フィルタリングキーの設定
 * @parent QuestMenuSetup
 * @type select
 * @option A
 * @value ok
 * @option B
 * @value cancel
 * @option X
 * @value shift
 * @option Y
 * @value menu
 * @option LB
 * @value pageup
 * @option RB
 * @value pagedown
 * @option LT
 * @value lt
 * @option RT
 * @value rt
 * @option back
 * @value back
 * @option start
 * @value start
 * @option L3
 * @value l3
 * @option R3
 * @value r3
 * @option 十字↑
 * @value up
 * @option 十字↓
 * @value down
 * @option 十字←
 * @value left
 * @option 十字→
 * @value right
 * @default rt
 * @desc ゲームパッド上でクエストメニュー時のフィルタリングメニューを表示するキーを指定します。
 * 
 * @param QuestMenuNaviKey
 * @text ナビ設定キーの設定
 * @parent QuestMenuSetup
 * @type select
 * @option Aキー
 * @value A
 * @option Bキー
 * @value B
 * @option Cキー
 * @value C
 * @option Dキー
 * @value D
 * @option Eキー
 * @value E
 * @option Fキー
 * @value F
 * @option Gキー
 * @value G
 * @option Hキー
 * @value H
 * @option Iキー
 * @value I
 * @option Jキー
 * @value J
 * @option Kキー
 * @value K
 * @option Lキー
 * @value L
 * @option Mキー
 * @value M
 * @option Nキー
 * @value N
 * @option Oキー
 * @value O
 * @option Pキー
 * @value P
 * @option Qキー
 * @value pageup
 * @option Rキー
 * @value R
 * @option Sキー
 * @value S
 * @option Tキー
 * @value T
 * @option Uキー
 * @value U
 * @option Vキー
 * @value V
 * @option Wキー
 * @value pagedown
 * @option Yキー
 * @value Y
 * @default A
 * @desc クエストメニュー時の対象をクエストナビゲーターに設定するキーを指定します。
 * 
 * @param QuestMenuPadNaviKey
 * @text [パッド]ナビ設定キーの設定
 * @parent QuestMenuSetup
 * @type select
 * @option A
 * @value ok
 * @option B
 * @value cancel
 * @option X
 * @value shift
 * @option Y
 * @value menu
 * @option LB
 * @value pageup
 * @option RB
 * @value pagedown
 * @option LT
 * @value lt
 * @option RT
 * @value rt
 * @option back
 * @value back
 * @option start
 * @value start
 * @option L3
 * @value l3
 * @option R3
 * @value r3
 * @option 十字↑
 * @value up
 * @option 十字↓
 * @value down
 * @option 十字←
 * @value left
 * @option 十字→
 * @value right
 * @default lt
 * @desc ゲームパッド上でクエストメニュー時の対象をクエストナビゲーターに設定するキーを指定します。
 * 
 * @param QuestMenuCancelKey
 * @text クエスト放棄キーの設定
 * @parent QuestMenuSetup
 * @type select
 * @option Aキー
 * @value A
 * @option Bキー
 * @value B
 * @option Cキー
 * @value C
 * @option Dキー
 * @value D
 * @option Eキー
 * @value E
 * @option Fキー
 * @value F
 * @option Gキー
 * @value G
 * @option Hキー
 * @value H
 * @option Iキー
 * @value I
 * @option Jキー
 * @value J
 * @option Kキー
 * @value K
 * @option Lキー
 * @value L
 * @option Mキー
 * @value M
 * @option Nキー
 * @value N
 * @option Oキー
 * @value O
 * @option Pキー
 * @value P
 * @option Qキー
 * @value pageup
 * @option Rキー
 * @value R
 * @option Sキー
 * @value S
 * @option Tキー
 * @value T
 * @option Uキー
 * @value U
 * @option Vキー
 * @value V
 * @option Wキー
 * @value pagedown
 * @option Yキー
 * @value Y
 * @default S
 * @desc クエストメニュー時の対象をクエストを放棄するキーを指定します。
 * 
 * @param QuestMenuPadCancelKey
 * @text [パッド]クエスト放棄キーの設定
 * @parent QuestMenuSetup
 * @type select
 * @option A
 * @value ok
 * @option B
 * @value cancel
 * @option X
 * @value shift
 * @option Y
 * @value menu
 * @option LB
 * @value pageup
 * @option RB
 * @value pagedown
 * @option LT
 * @value lt
 * @option RT
 * @value rt
 * @option back
 * @value back
 * @option start
 * @value start
 * @option L3
 * @value l3
 * @option R3
 * @value r3
 * @option 十字↑
 * @value up
 * @option 十字↓
 * @value down
 * @option 十字←
 * @value left
 * @option 十字→
 * @value right
 * @default back
 * @desc ゲームパッド上でクエストメニュー時の対象をクエストを放棄するキーを指定します。
 * 
 * @param QuestConditionIcons
 * @text クエストリストの進行カテゴリーのアイコン
 * @parent QuestMenuSetup
 * @type number[]
 * @default ["193","191","194"]
 * @desc 1は進行中、2はクリア済み、3は失敗のアイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param QuestNaviCommandName
 * @text クエストナビゲーターのコマンド名
 * @parent QuestMenuSetup
 * @type string[]
 * @default ["ナビ設定","ナビ解除","キャンセル"]
 * @desc ナビ設定コマンド時の名前を指定します。1はナビ設定用、2は設定されている対象の解除用、3はキャンセル用
 * 
 * @param QuestDataPageKey
 * @text ページめくりキーの設定
 * @parent QuestDataSetup
 * @type struct<QuestDataPageKeySettings>
 * @desc クエスト詳細内容のページをめくるキーと音の設定
 * 
 * @param QuestDataPageUpLabel
 * @text ページ前送りキーのラベル設定
 * @parent QuestDataSetup
 * @type struct<QuestDataPageUpLabelSetup>
 * @desc クエスト詳細画面のページ前送りキーの表示設定。
 * 
 * @param QuestDataPageDownLabel
 * @text ページ先送りキーのラベル設定
 * @parent QuestDataSetup
 * @type struct<QuestDataPageDownLabelSetup>
 * @desc クエスト詳細画面のページ先送りキーの表示設定。
 * 
 * @param QuestDataDifficultySetup
 * @text 難易度の表示設定
 * @parent QuestDataSetup
 * @type struct<QuestDataDifficultySettings>
 * @desc 難易度アイコン群の設定。アイコンリスト:設定そのものがテキストなので入力欄で右クリメニューから開けます。
 * 
 * @param QuestDataInfoLabel
 * @text クエスト詳細のラベル設定
 * @parent QuestDataSetup
 * @type string[]
 * @default ["詳細情報","目的"]
 * @desc クエスト詳細画面のページ切り替え時の内容ラベル名を指定します。1は1ページ目の内容ラベル、2は2ページ目の内容ラベル
 * 
 * @param QuestDataClientLabel
 * @text 依頼者のラベル設定
 * @parent QuestDataSetup
 * @type string
 * @default 依頼者
 * @desc クエスト詳細画面の依頼者のラベル名を指定します。
 * 
 * @param QuestDataLocationLabel
 * @text 依頼場所のラベル設定
 * @parent QuestDataSetup
 * @type struct<QuestDataLocationSettings>
 * @desc クエスト詳細画面の依頼場所の表示設定を行います。
 * 
 * @param QuestDataQuestAreaLabel
 * @text 主な活動場所のラベル設定
 * @parent QuestDataSetup
 * @type struct<QuestDataQuestAreaSettings>
 * @desc クエスト詳細画面の主な活動場所の表示設定を行います。
 * 
 * @param QuestDataContentLabel
 * @text クエスト概要のラベル設定
 * @parent QuestDataSetup
 * @type string
 * @default 概要
 * @desc クエスト詳細画面の概要のラベル名を指定します。
 * 
 * @param QuestDataRewardLabel
 * @text クエスト報酬のラベル設定
 * @parent QuestDataSetup
 * @type struct<QuestDataRewardSettings>
 * @desc クエスト詳細画面の報酬の表示設定を行います。
 * 
 * @param QuestNaviMapSceneKey
 * @text MAP時のナビゲーターキー
 * @parent QuestNaviSetup
 * @type struct<QuestNaviMapSceneKeySetup>
 * @desc マップ時にプレイヤーにナビゲーターの表示/非表示を操作させるかの設定を行います。
 * 
 * @param QuestAssentedSoundData
 * @text クエスト受注効果音の設定
 * @parent QuestOtherSounds
 * @type struct<QuestAssentSoundSettings>
 * @desc クエストを受注した時に再生する効果音の設定
 * 
 * @param QuestGetSoundData
 * @text 目的物獲得時の効果音の設定
 * @parent QuestOtherSounds
 * @type struct<QuestGetSoundSettings>
 * @desc 目的のものを獲得した時に再生する効果音の設定
 * 
 * @param QuestLostSoundData
 * @text 目的物消失時の効果音の設定
 * @parent QuestOtherSounds
 * @type struct<QuestLostSoundSettings>
 * @desc 目的のものを消失した時に再生する効果音の設定
 * 
 * @param QuestObjClearSoundData
 * @text 目的達成時の効果音の設定
 * @parent QuestOtherSounds
 * @type struct<QuestObjClearSoundSettings>
 * @desc 目的のものを達成した時に再生するMEの設定
 * 
 * @param QuestReportSoundData
 * @text 報告時の効果音の設定
 * @parent QuestOtherSounds
 * @type struct<QuestReportSoundSettings>
 * @desc クエストを報告した時に再生するMEの設定
 * 
 * @param QuestFailedSoundData
 * @text クエスト失敗時の効果音の設定
 * @parent QuestOtherSounds
 * @type struct<QuestFailedSoundSettings>
 * @desc クエストを失敗した時に再生するMEの設定
 */

/*~struct~QuestRequirementSetups:ja
 * @param UseActorLevel
 * @text アクターレベルの判定
 * @type boolean
 * @on 判定する
 * @off 判定しない
 * @default true
 * @desc 受注条件としてアクターのレベルを判定するか指定。
 * 
 * @param UseNeededMember
 * @text 必要メンバーの判定
 * @type boolean
 * @on 判定する
 * @off 判定しない
 * @default true
 * @desc 受注条件として必要メンバーを判定するか指定。
 * 
 * @param UseOutedMember
 * @text 除外メンバーの判定
 * @type boolean
 * @on 判定する
 * @off 判定しない
 * @default true
 * @desc 受注条件として除外メンバーを判定するか指定。
 * 
 * @param UseMaxMember
 * @text 上限人数の判定
 * @type boolean
 * @on 判定する
 * @off 判定しない
 * @default true
 * @desc 受注条件として上限人数を判定するか指定。
 * 
 * @param UseSw
 * @text スイッチの判定
 * @type boolean
 * @on 判定する
 * @off 判定しない
 * @default true
 * @desc 受注条件としてスイッチ状態を判定するか指定。
 * 
 * @param UseVal
 * @text 変数の判定
 * @type boolean
 * @on 判定する
 * @off 判定しない
 * @default true
 * @desc 受注条件として変数状態を判定するか指定。
 * 
 * @param UseQuestAssented
 * @text 受注クエストの判定
 * @type boolean
 * @on 判定する
 * @off 判定しない
 * @default true
 * @desc 受注条件としてクエストを受注しているかを指定。
 * 
 * @param UseQuestReported
 * @text 報告済みクエストの判定
 * @type boolean
 * @on 判定する
 * @off 判定しない
 * @default true
 * @desc 受注条件としてクエストを報告しているかを指定。
 */

/*~struct~QuestFailedSoundSettings:ja
 * @param UseQuestSound
 * @text MEの使用設定
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc MEを使用する/使用しないを設定します。
 * 
 * @param QuestSound
 * @text 効果音
 * @type file
 * @dir audio/me
 * @default Gag3
 * @desc 再生するMEを指定します。
 */

/*~struct~QuestReportSoundSettings:ja
 * @param UseQuestSound
 * @text MEの使用設定
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc MEを使用する/使用しないを設定します。
 * 
 * @param QuestSound
 * @text 効果音
 * @type file
 * @dir audio/me
 * @default Victory1
 * @desc 再生するMEを指定します。
 */

/*~struct~QuestObjClearSoundSettings:ja
 * @param UseQuestSound
 * @text MEの使用設定
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc MEを使用する/使用しないを設定します。
 * 
 * @param QuestSound
 * @text 効果音
 * @type file
 * @dir audio/me
 * @default Item
 * @desc 再生するMEを指定します。
 */

/*~struct~QuestLostSoundSettings:ja
 * @param UseQuestSound
 * @text 効果音の使用設定
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc 効果音を使用する/使用しないを設定します。
 * 
 * @param QuestSound
 * @text 効果音
 * @type file
 * @dir audio/se
 * @default Miss
 * @desc 再生する効果音を指定します。
 */

/*~struct~QuestGetSoundSettings:ja
 * @param UseQuestSound
 * @text 効果音の使用設定
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc 効果音を使用する/使用しないを設定します。
 * 
 * @param QuestSound
 * @text 効果音
 * @type file
 * @dir audio/se
 * @default Item1
 * @desc 再生する効果音を指定します。
 */

/*~struct~QuestAssentSoundSettings:ja
 * @param UseQuestSound
 * @text 効果音の使用設定
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc 効果音を使用する/使用しないを設定します。
 * 
 * @param QuestSound
 * @text 効果音
 * @type file
 * @dir audio/se
 * @default Book2
 * @desc 再生する効果音を指定します。
 */

/*~struct~QuestNaviMapSceneKeySetup:ja
 * @param UseMapKey
 * @text MAP時のキー入力機能
 * @type Boolean
 * @on 有効化
 * @off 無効化
 * @default true
 * @desc マップシーン時のナビゲーター操作を有効化/無効化にします。
 * 
 * @param MapSceneKey
 * @text MAP時のキー設定
 * @type select
 * @option Aキー
 * @value A
 * @option Bキー
 * @value B
 * @option Cキー
 * @value C
 * @option Dキー
 * @value D
 * @option Eキー
 * @value E
 * @option Fキー
 * @value F
 * @option Gキー
 * @value G
 * @option Hキー
 * @value H
 * @option Iキー
 * @value I
 * @option Jキー
 * @value J
 * @option Kキー
 * @value K
 * @option Lキー
 * @value L
 * @option Mキー
 * @value M
 * @option Nキー
 * @value N
 * @option Oキー
 * @value O
 * @option Pキー
 * @value P
 * @option Qキー
 * @value pageup
 * @option Rキー
 * @value R
 * @option Sキー
 * @value S
 * @option Tキー
 * @value T
 * @option Uキー
 * @value U
 * @option Vキー
 * @value V
 * @option Wキー
 * @value pagedown
 * @option Yキー
 * @value Y
 * @default D
 * @desc マップシーン時のナビゲーター入力キーを設定します。
 * 
 * @param MapScenePadKey
 * @text [パッド]MAP時のキー設定
 * @parent QuestMenuSetup
 * @type select
 * @option A
 * @value ok
 * @option B
 * @value cancel
 * @option X
 * @value shift
 * @option Y
 * @value menu
 * @option LB
 * @value pageup
 * @option RB
 * @value pagedown
 * @option LT
 * @value lt
 * @option RT
 * @value rt
 * @option back
 * @value back
 * @option start
 * @value start
 * @option L3
 * @value l3
 * @option R3
 * @value r3
 * @option 十字↑
 * @value up
 * @option 十字↓
 * @value down
 * @option 十字←
 * @value left
 * @option 十字→
 * @value right
 * @default rt
 * @desc ゲームパッド上でマップシーン時のナビゲーター入力キーを設定します。
 */

/*~struct~QuestDataRewardSettings:ja
 * @param RewardLabelName
 * @text クエスト報酬のラベル名
 * @type string
 * @default 報酬
 * @desc クエスト詳細画面の報酬のラベル名を指定します。
 * 
 * @param RewardExpIcon
 * @text 経験値報酬のアイコン
 * @type number
 * @default 77
 * @desc クエスト詳細画面の報酬リストに経験値が含まれる際に表示。アイコンリスト:テキストタブの入力欄で右クリメニューから開く。
 * 
 * @param RewardExpUnit
 * @text 経験値報酬の単位
 * @type string
 * @default EXP
 * @desc クエスト詳細画面の報酬リストに経験値が報酬として含まれる場合に単位として表示されます。
 * 
 * @param RewardGoldIcon
 * @text お金報酬のアイコン
 * @type number
 * @default 313
 * @desc クエスト詳細画面の報酬リストにお金が含まれる際に表示。アイコンリスト:テキストタブの入力欄で右クリメニューから開く。
 * 
 * @param RewardGoldUnit
 * @text お金報酬の単位
 * @type string
 * @default G
 * @desc クエスト詳細画面の報酬リストにお金が報酬として含まれる場合に単位として表示されます。
 */

/*~struct~QuestDataQuestAreaSettings:ja
 * @param LocationLabelName
 * @text 主な活動場所のラベル名
 * @type string
 * @default 主な活動場所
 * @desc クエスト詳細画面の主な活動場所のラベル名を指定します。
 * 
 * @param LocationLabelIcon
 * @text 主な活動場所のアイコン
 * @type number
 * @default 190
 * @desc アイコンを指定します。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 */

/*~struct~QuestDataLocationSettings:ja
 * @param LocationLabelName
 * @text 依頼場所のラベル名
 * @type string
 * @default 依頼場所
 * @desc クエスト詳細画面の依頼場所のラベル名を指定します。
 * 
 * @param LocationLabelIcon
 * @text 依頼場所のアイコン
 * @type number
 * @default 190
 * @desc アイコンを指定します。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 */

/*~struct~QuestDataDifficultySettings:ja
 * @param IconPacks
 * @text 難易度アイコン群
 * @type string[]
 * @default ["5,5,5,5,5","4,4,4,4","3,3,3","2,2"]
 * @desc アイコンindex番号を ,(コンマ) で区切って指定します。登録順にIDが、0、1、2...etc となります。
 * 
 * @param TextColor
 * @text 難易度テキストの色
 * @type number
 * @default 18
 * @desc システムカラー番号を指定します。
 */

/*~struct~QuestDataPageDownLabelSetup:ja
 * @param PageDownIcon
 * @text 先送りアイコン
 * @type number
 * @min 0
 * @default 189
 * @desc 先送りアイコンを指定します。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param PageDownKeyLabel
 * @text 先送りキーのラベル設定
 * @type string
 * @default W(RB):
 * @desc 先送りキーの表示文になります。
 */

/*~struct~QuestDataPageUpLabelSetup:ja
 * @param PageUpIcon
 * @text 前送りアイコン
 * @type number
 * @min 0
 * @default 187
 * @desc 前送りアイコンを指定します。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param PageUpKeyLabel
 * @text 前送りキーのラベル設定
 * @type string
 * @default :Q(LB)
 * @desc 前送りキーの表示文になります。
 */

/*~struct~QuestDataPageKeySettings:ja
 * @param PageUpKey
 * @text 前送りキーの設定
 * @type select
 * @option Aキー
 * @value A
 * @option Bキー
 * @value B
 * @option Cキー
 * @value C
 * @option Dキー
 * @value D
 * @option Eキー
 * @value E
 * @option Fキー
 * @value F
 * @option Gキー
 * @value G
 * @option Hキー
 * @value H
 * @option Iキー
 * @value I
 * @option Jキー
 * @value J
 * @option Kキー
 * @value K
 * @option Lキー
 * @value L
 * @option Mキー
 * @value M
 * @option Nキー
 * @value N
 * @option Oキー
 * @value O
 * @option Pキー
 * @value P
 * @option Qキー
 * @value pageup
 * @option Rキー
 * @value R
 * @option Sキー
 * @value S
 * @option Tキー
 * @value T
 * @option Uキー
 * @value U
 * @option Vキー
 * @value V
 * @option Wキー
 * @value pagedown
 * @option Yキー
 * @value Y
 * @default pageup
 * @desc クエスト詳細ページめくりの前送りのキーを指定します。
 * 
 * @param PageDownKey
 * @text 先送りキーの設定
 * @type select
 * @option Aキー
 * @value A
 * @option Bキー
 * @value B
 * @option Cキー
 * @value C
 * @option Dキー
 * @value D
 * @option Eキー
 * @value E
 * @option Fキー
 * @value F
 * @option Gキー
 * @value G
 * @option Hキー
 * @value H
 * @option Iキー
 * @value I
 * @option Jキー
 * @value J
 * @option Kキー
 * @value K
 * @option Lキー
 * @value L
 * @option Mキー
 * @value M
 * @option Nキー
 * @value N
 * @option Oキー
 * @value O
 * @option Pキー
 * @value P
 * @option Qキー
 * @value pageup
 * @option Rキー
 * @value R
 * @option Sキー
 * @value S
 * @option Tキー
 * @value T
 * @option Uキー
 * @value U
 * @option Vキー
 * @value V
 * @option Wキー
 * @value pagedown
 * @option Yキー
 * @value Y
 * @default pagedown
 * @desc クエスト詳細ページめくりの先送りのキーを指定します。
 * 
 * @param PageChangeSound
 * @text ページめくり効果音の設定
 * @type file
 * @dir audio/se
 * @default Book2
 */

/*~struct~QuestMenuQuestCategorySetup:ja
 * @param CategoryID
 * @text クエストカテゴリーのID
 * @type string[]
 * @default ["cat0","cat1","cat2","cat3"]
 * @desc カテゴリーIDを cat + ID で指定してください。※cat0 はすべてのクエストに自動的に登録されるため、必須です。
 * 
 * @param CategoryName
 * @text クエストカテゴリーの名前
 * @type string[]
 * @default ["All","会話","収集","討伐"]
 * @desc カテゴリーIDと同じ順番で対象カテゴリーの名前を設定してください。
 */

/*~struct~QuestMenuConditionCategorySetup:ja
 * @param CategoryIconAll
 * @text 「すべて」のカテゴリーアイコン
 * @type number
 * @min 0
 * @default 187
 * @desc クエストメニュー時の「すべて」のアイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param CategoryNameAll
 * @text 「すべて」のカテゴリー名
 * @type string
 * @default All
 * @desc クエストメニュー時の「すべて」のカテゴリー名を指定。
 * 
 * @param CategoryIconActive
 * @text 「進行中」のカテゴリーアイコン
 * @type number
 * @min 0
 * @default 189
 * @desc クエストメニュー時の「進行中」のアイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param CategoryNameActive
 * @text 「進行中」のカテゴリー名
 * @type string
 * @default 進行中のクエスト
 * @desc クエストメニュー時の「進行中」のカテゴリー名を指定。
 * 
 * @param CategoryIconCleared
 * @text 「クリア済み」のカテゴリーアイコン
 * @type number
 * @min 0
 * @default 191
 * @desc クエストメニュー時の「クリア済み」のアイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param CategoryNameCleared
 * @text 「クリア済み」のカテゴリー名
 * @type string
 * @default クリア済みのクエスト
 * @desc クエストメニュー時の「クリア済み」のカテゴリー名を指定。
 * 
 * @param CategoryIconFailed
 * @text 「失敗クエスト」のカテゴリーアイコン
 * @type number
 * @min 0
 * @default 194
 * @desc クエストメニュー時の「失敗クエスト」のアイコンを指定。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param CategoryNameFailed
 * @text 「失敗クエスト」のカテゴリー名
 * @type string
 * @default 失敗したクエスト
 * @desc クエストメニュー時の「失敗クエスト」のカテゴリー名を指定。※失敗クエストの機能が有効の時に採用されます。
 */

/*~struct~FontInfomation:ja
 * @param FontName
 * @text フォント書式名
 * @type string
 * @desc クエスト全体で使用する書式名を記入します。未設定で使用しない。
 * 
 * @param FontSize
 * @text フォントサイズ
 * @type number
 * @default 16
 * @desc クエスト全体で使用する文字の大きさを指定。0でプロジェクトの設定を使用
 */

/*~struct~QuestMenuCommandInfomation:ja
 * @param AddToMenuCommand
 * @text メニューに追加
 * @type boolean
 * @on コマンドを追加する
 * @off コマンドを追加しない
 * @default true
 * @desc メニューに「クエスト」コマンドを追加する。
 * 
 * @param QuestMenuCommandName
 * @text クエストコマンド名
 * @type string
 * @default クエスト
 * @desc メニュー画面のコマンド追加時の名前になります。
 */

//=============================================================================
//  【QuestCustamizeSettings】
//=============================================================================

/*~struct~QuestCustamizeSettings:ja
 * @param DefaultDesigns
 * @text 簡易デザイン設定
 * 
 * @param TextColors
 * @text 文字色の設定
 * 
 * @param BoardWindowSetup
 * @text クエストボードの設定
 * 
 * @param MustWindowSetup
 * @text 受注条件ウィンドウの設定
 * 
 * @param DataWindowSetup
 * @text クエスト詳細ウィンドウの設定
 * 
 * @param NavWindowSetup
 * @text クエストナビゲーターの設定
 * 
 * @param QuestMenuSetup
 * @text クエストメニューの設定
 * 
 * @param AllCommandSetup
 * @text コマンド関連の設定
 * 
 * @param WindowSets
 * @text 使用ウィンドウ設定
 * @parent DefaultDesigns
 * @type struct<WinDesignSet>
 * @desc 簡易デザインを使用するウィンドウを指定します。
 * 
 * @param BoardSet
 * @text クエストボードデザイン設定
 * @parent DefaultDesigns
 * @type struct<WinBoardSet>
 * @desc このリストはクエストボードウィンドウで表示中の簡易デザインの上から下に向かって同じ並びになっています。
 * 
 * @param NeededSet
 * @text 必須条件デザイン設定
 * @parent DefaultDesigns
 * @type struct<WinNeededSet>
 * @desc このリストは必須条件ウィンドウで表示中の簡易デザインの上から下に向かって同じ並びになっています。
 * 
 * @param DataSet
 * @text クエスト詳細デザイン設定
 * @parent DefaultDesigns
 * @type struct<WinDataSet>
 * @desc このリストはクエスト詳細ウィンドウで表示中の簡易デザインの上から下に向かって同じ並びになっています。
 * 
 * @param HeadingColor
 * @text 見出しの色
 * @parent TextColors
 * @type string
 * @default #99ccff
 * @desc 見出し系の色を指定。カラーコードで指定します。ヘルプに有力サイトを載せています。
 * 
 * @param DealOkColor
 * @text 条件を満たした時の色
 * @parent TextColors
 * @type string
 * @default #00e060
 * @desc 条件を満たした時の色を指定。カラーコードで指定します。ヘルプに有力サイトを載せています。
 * 
 * @param DealNoColor
 * @text 条件を満たしていない時の色
 * @parent TextColors
 * @type string
 * @default #ff2020
 * @desc 条件を満たしていない時の色を指定。カラーコードで指定します。ヘルプに有力サイトを載せています。
 * 
 * @param NaviColor
 * @text ナビ設定時の色
 * @parent TextColors
 * @type string
 * @default #83ff83
 * @desc クエストメニューのリストでナビ設定した時の色。カラーコードで指定します。ヘルプに有力サイトを載せています。
 * 
 * @param AreaColor
 * @text ナビの活動エリアの色
 * @parent TextColors
 * @type string
 * @default #83ff83
 * @desc クエストナビゲーターの活動エリアの色。カラーコードで指定します。ヘルプに有力サイトを載せています。
 * 
 * @param ExpGoldColor
 * @text 報酬単位の色
 * @parent TextColors
 * @type string
 * @default #84a9ff
 * @desc クエスト詳細画面のお金/経験値報酬の単位の色。カラーコードで指定します。ヘルプに有力サイトを載せています。
 * 
 * @param BoardWindow
 * @text ボードウィンドウの設定
 * @parent BoardWindowSetup
 * @type struct<BoardWindowSettings>
 * @desc クエストボードの設定を行います。
 * 
 * @param BoardData
 * @text ボードデータの設定
 * @parent BoardWindowSetup
 * @type struct<BoardDataSettings>
 * @desc クエストボードの各データの設定を行います。
 * 
 * @param MustWindow
 * @text 受注条件ウィンドウの設定
 * @parent MustWindowSetup
 * @type struct<MustWindowSettings>
 * @desc 受注条件ウィンドウの設定を行います。
 * 
 * @param MustData
 * @text 受注条件データの設定
 * @parent MustWindowSetup
 * @type struct<MustDataSettings>
 * @desc 受注条件ウィンドウの各データの設定を行います。
 * 
 * @param DataWindow
 * @text クエスト詳細ウィンドウの設定
 * @parent DataWindowSetup
 * @type struct<DataWindowSettings>
 * @desc クエスト詳細ウィンドウの設定を行います。
 * 
 * @param QuestDatas
 * @text クエスト詳細データの設定
 * @parent DataWindowSetup
 * @type struct<QuestDatasSettings>
 * @desc クエスト詳細の各データの設定を行います。
 * 
 * @param NavWindow
 * @text クエストナビゲーターウィンドウの設定
 * @parent NavWindowSetup
 * @type struct<NavWindowSettings>
 * @desc クエストナビゲーターウィンドウの設定を行います。
 * 
 * @param NavData
 * @text クエストナビゲーターのデータ設定
 * @parent NavWindowSetup
 * @type struct<NavDataSettings>
 * @desc クエストナビゲーターの各データの設定を行います。
 * 
 * @param MenuWindow
 * @text クエストメニューウィンドウの設定
 * @parent QuestMenuSetup
 * @type struct<MenuWindowSettings>
 * @desc クエストメニュー画面の設定を行います。
 * 
 * @param MenuCommand
 * @text 各種コマンドウィンドウの設定
 * @parent AllCommandSetup
 * @type struct<MenuCommandSettings>
 * @desc 各種コマンドウィンドウの設定を行います。
 */

/*~struct~NavDataSettings:ja
 * @param QuestNameX
 * @text クエスト名x座標
 * @type string
 * @default 0
 * @desc クエストナビゲーターのクエスト名表示x座標の調整値を指定します。
 * 
 * @param QuestNameY
 * @text クエスト名y座標
 * @type string
 * @default 0
 * @desc クエストナビゲーターのクエスト名表示y座標の調整値を指定します。
 * 
 * @param AreaLabelX
 * @text 活動エリアラベルx座標
 * @type string
 * @default 0
 * @desc クエストナビゲーターの活動エリアラベル表示x座標の調整値を指定します。
 * 
 * @param AreaLabelY
 * @text 活動エリアラベルy座標
 * @type string
 * @default 0
 * @desc クエストナビゲーターの活動エリアラベル表示y座標の調整値を指定します。
 * 
 * @param AreaX
 * @text 活動エリアx座標
 * @type string
 * @default 0
 * @desc クエストナビゲーターの活動エリア表示x座標の調整値を指定します。
 * 
 * @param AreaY
 * @text 活動エリアy座標
 * @type string
 * @default 0
 * @desc クエストナビゲーターの活動エリア表示y座標の調整値を指定します。
 * 
 * @param ObjectiveX
 * @text 目的x座標
 * @type string
 * @default 0
 * @desc クエストナビゲーターの目的表示x座標の調整値を指定します。
 * 
 * @param ObjectiveY
 * @text 目的y座標
 * @type string
 * @default 0
 * @desc クエストナビゲーターの目的表示y座標の調整値を指定します。
 */

/*~struct~NavWindowSettings:ja
 * @param NavX
 * @text ナビゲーターウィンドウのx座標
 * @type string
 * @default 408
 * @desc ナビゲーターウィンドウのx座標を指定します。
 * 
 * @param NavY
 * @text ナビゲーターウィンドウのy座標
 * @type string
 * @default 0
 * @desc ナビゲーターウィンドウのy座標を指定します。
 * 
 * @param NavWidth
 * @text ナビゲーターウィンドウの横幅
 * @type string
 * @default 408
 * @desc ナビゲーターウィンドウの横幅を指定します。
 * 
 * @param NavHeight
 * @text ナビゲーターウィンドウの縦幅
 * @type string
 * @default 624
 * @desc ナビゲーターウィンドウの縦幅を指定します。
 * 
 * @param NavOpacity
 * @text ナビゲーターウィンドウの枠の不透明度
 * @type string
 * @default 0
 * @desc ナビゲーターウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param NavBackOpacity
 * @text ナビゲーターウィンドウの内背景の不透明度
 * @type string
 * @default 0
 * @desc ナビゲーターウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param NavBackImg
 * @text ナビゲーターウィンドウの背景レイアウト画像
 * @type struct<NavBackImgSetup>
 * @desc ナビゲーターウィンドウの背景レイアウト画像を追加します。※有効時は可変背景を無効化します。
 */

/*~struct~NavBackImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※クエストナビゲーター位置からの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※クエストナビゲーター位置からの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~QuestDatasSettings:ja
 * @param flagX
 * @text フラッグx座標
 * @type string
 * @default 0
 * @desc クエスト詳細のフラッグ表示x座標の調整値を指定します。
 * 
 * @param flagY
 * @text フラッグy座標
 * @type string
 * @default 0
 * @desc クエスト詳細のフラッグ表示y座標の調整値を指定します。
 * 
 * @param flagFontSize
 * @text フラッグの文字サイズ
 * @type string
 * @default 26
 * @desc クエスト詳細のフラッグの文字サイズを指定します。
 * 
 * @param DifficultyX
 * @text 難易度x座標
 * @type string
 * @default 0
 * @desc クエスト詳細の難易度表示x座標の調整値を指定します。
 * 
 * @param DifficultyY
 * @text 難易度y座標
 * @type string
 * @default 0
 * @desc クエスト詳細の難易度表示y座標の調整値を指定します。
 * 
 * @param DifficultyIconX
 * @text 難易度アイコン群x座標
 * @type string
 * @default 0
 * @desc クエスト詳細の難易度アイコン群表示x座標の調整値を指定します。
 * 
 * @param DifficultyIconY
 * @text 難易度アイコン群y座標
 * @type string
 * @default 0
 * @desc クエスト詳細の難易度アイコン群表示y座標の調整値を指定します。
 * 
 * @param DifficultyIconW
 * @text 難易度アイコン群間隔座標
 * @type string
 * @default -26
 * @desc 難易度アイコン群間隔座標を指定します。※マイナスで指定すると左から右に向けて奥にアイコンが配置されていきます。
 * 
 * @param QuestNameX
 * @text クエスト名x座標
 * @type string
 * @default 0
 * @desc クエスト詳細のクエスト名表示x座標の調整値を指定します。
 * 
 * @param QuestNameY
 * @text クエスト名y座標
 * @type string
 * @default 0
 * @desc クエスト詳細のクエスト名表示y座標の調整値を指定します。
 * 
 * @param QuestNameFontSize
 * @text クエスト名の文字サイズ
 * @type string
 * @default 26
 * @desc クエスト詳細のクエスト名の文字サイズを指定します。
 * 
 * @param PageLabelX
 * @text クエスト詳細ラベルx座標
 * @type string
 * @default 0
 * @desc 基本設定の「クエスト詳細の設定 > クエスト詳細ラベル」表示x座標の調整値を指定します。
 * 
 * @param PageLabelY
 * @text クエスト詳細ラベルy座標
 * @type string
 * @default 0
 * @desc 基本設定の「クエスト詳細の設定 > クエスト詳細ラベル」表示y座標の調整値を指定します。
 * 
 * @param PageLabelPageX
 * @text クエスト詳細のページ数x座標
 * @type string
 * @default 0
 * @desc クエスト詳細のページ数表示x座標の調整値を指定します。
 * 
 * @param PageLabelPageY
 * @text クエスト詳細のページ数y座標
 * @type string
 * @default 0
 * @desc クエスト詳細のページ数表示y座標の調整値を指定します。
 * 
 * @param PageUpKeyX
 * @text クエスト詳細のページ前送りキーx座標
 * @type string
 * @default 0
 * @desc クエスト詳細のページ前送りキー表示x座標の調整値を指定します。
 * 
 * @param PageUpKeyY
 * @text クエスト詳細のページ前送りキーy座標
 * @type string
 * @default 0
 * @desc クエスト詳細のページ前送りキー表示y座標の調整値を指定します。
 * 
 * @param PageUpKeyIconY
 * @text クエスト詳細のページ前送りキーアイコンy座標
 * @type string
 * @default 0
 * @desc クエスト詳細のページ前送りキーアイコン表示y座標の調整値を指定します。
 * 
 * @param PageDownKeyX
 * @text クエスト詳細のページ先送りキーx座標
 * @type string
 * @default 0
 * @desc クエスト詳細のページ先送りキー表示x座標の調整値を指定します。
 * 
 * @param PageDownKeyY
 * @text クエスト詳細のページ先送りキーy座標
 * @type string
 * @default 0
 * @desc クエスト詳細のページ先送りキー表示y座標の調整値を指定します。
 * 
 * @param PageDownKeyIconY
 * @text クエスト詳細のページ先送りキーアイコンy座標
 * @type string
 * @default 0
 * @desc クエスト詳細のページ先送りキーアイコン表示y座標の調整値を指定します。
 * 
 * @param LocationLabelX
 * @text クエスト詳細の受注場所ラベルx座標
 * @type string
 * @default 0
 * @desc クエスト詳細の受注場所ラベル表示x座標の調整値を指定します。
 * 
 * @param LocationLabelY
 * @text クエスト詳細の受注場所ラベルy座標
 * @type string
 * @default 0
 * @desc クエスト詳細の受注場所ラベル表示y座標の調整値を指定します。
 * 
 * @param LocationX
 * @text クエスト詳細の受注場所x座標
 * @type string
 * @default 0
 * @desc クエスト詳細の受注場所表示x座標の調整値を指定します。
 * 
 * @param LocationY
 * @text クエスト詳細の受注場所y座標
 * @type string
 * @default 0
 * @desc クエスト詳細の受注場所表示y座標の調整値を指定します。
 * 
 * @param ClientLabelX
 * @text クエスト詳細の依頼者ラベルx座標
 * @type string
 * @default 0
 * @desc クエスト詳細の依頼者ラベル表示x座標の調整値を指定します。
 * 
 * @param ClientLabelY
 * @text クエスト詳細の依頼者ラベルy座標
 * @type string
 * @default 0
 * @desc クエスト詳細の依頼者ラベル表示y座標の調整値を指定します。
 * 
 * @param ClientX
 * @text クエスト詳細の依頼者x座標
 * @type string
 * @default 0
 * @desc クエスト詳細の依頼者表示x座標の調整値を指定します。
 * 
 * @param ClientY
 * @text クエスト詳細の依頼者y座標
 * @type string
 * @default 0
 * @desc クエスト詳細の依頼者表示y座標の調整値を指定します。
 * 
 * @param ContentLabelX
 * @text クエスト詳細の概要ラベルx座標
 * @type string
 * @default 0
 * @desc クエスト詳細の概要ラベル表示x座標の調整値を指定します。
 * 
 * @param ContentLabelY
 * @text クエスト詳細の概要ラベルy座標
 * @type string
 * @default 0
 * @desc クエスト詳細の概要ラベル表示y座標の調整値を指定します。
 * 
 * @param ContentX
 * @text クエスト詳細の概要x座標
 * @type string
 * @default 0
 * @desc クエスト詳細の概要表示x座標の調整値を指定します。
 * 
 * @param ContentY
 * @text クエスト詳細の概要y座標
 * @type string
 * @default 0
 * @desc クエスト詳細の概要表示y座標の調整値を指定します。
 * 
 * @param RewardLabelX
 * @text クエスト詳細の報告ラベルx座標
 * @type string
 * @default 0
 * @desc クエスト詳細の報告ラベル表示x座標の調整値を指定します。
 * 
 * @param RewardLabelY
 * @text クエスト詳細の報告ラベルy座標
 * @type string
 * @default 0
 * @desc クエスト詳細の報告ラベル表示y座標の調整値を指定します。
 * 
 * @param RewardExpX
 * @text クエスト詳細の報酬経験値x座標
 * @type string
 * @default 0
 * @desc クエスト詳細の報酬経験値表示x座標の調整値を指定します。
 * 
 * @param RewardExpY
 * @text クエスト詳細の報酬経験値y座標
 * @type string
 * @default 0
 * @desc クエスト詳細の報酬経験値表示y座標の調整値を指定します。
 * 
 * @param RewardGoldX
 * @text クエスト詳細の報酬お金x座標
 * @type string
 * @default 0
 * @desc クエスト詳細の報酬お金表示x座標の調整値を指定します。
 * 
 * @param RewardGoldY
 * @text クエスト詳細の報酬お金y座標
 * @type string
 * @default 0
 * @desc クエスト詳細の報酬お金表示y座標の調整値を指定します。
 * 
 * @param RewardItemX
 * @text クエスト詳細の報酬アイテムx座標
 * @type string
 * @default 0
 * @desc クエスト詳細の報酬アイテム表示x座標の調整値を指定します。
 * 
 * @param RewardItemY
 * @text クエスト詳細の報酬アイテムy座標
 * @type string
 * @default 0
 * @desc クエスト詳細の報酬アイテム表示y座標の調整値を指定します。
 * 
 * @param RewardItemDrawMode
 * @text クエスト詳細の報酬アイテムを2列化
 * @type boolean
 * @on 2列表示
 * @off 1列表示
 * @default true
 * @desc クエスト詳細の報酬アイテムの表示方法を指定します。
 * 
 * @param RewardItemSecondX
 * @text クエスト詳細の報酬2列目x座標
 * @type string
 * @default 190
 * @desc クエスト詳細の報酬2列目x座標を指定します。
 */

/*~struct~DataWindowSettings:ja
 * @param DataX
 * @text クエスト詳細ウィンドウのx座標
 * @type string
 * @default 164
 * @desc クエスト詳細ウィンドウのx座標を指定します。
 * 
 * @param DataY
 * @text クエスト詳細ウィンドウのy座標
 * @type string
 * @default 28
 * @desc クエスト詳細ウィンドウのy座標を指定します。
 * 
 * @param DataWidth
 * @text クエスト詳細ウィンドウの横幅
 * @type string
 * @default 488
 * @desc クエスト詳細ウィンドウの横幅を指定します。
 * 
 * @param DataHeight
 * @text クエスト詳細ウィンドウの縦幅
 * @type string
 * @default 568
 * @desc クエスト詳細ウィンドウの縦幅を指定します。
 * 
 * @param DataOpacity
 * @text クエスト詳細ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc クエスト詳細ウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param DataBackOpacity
 * @text クエスト詳細ウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc クエスト詳細ウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param DataBackImg
 * @text クエスト詳細ウィンドウの背景レイアウト画像
 * @type struct<DataBackImgSetup>
 * @desc クエスト詳細ウィンドウの背景レイアウト画像を追加します。
 */

/*~struct~DataBackImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※クエスト詳細ウィンドウ位置からの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※クエスト詳細ウィンドウ位置からの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~MenuCommandSettings:ja
 * @param AssentingX
 * @text 受注コマンドのx座標
 * @type string
 * @default 288
 * @desc マップシーン中の受注コマンドのx座標を指定します。
 * 
 * @param AssentingY
 * @text 受注コマンドのy座標
 * @type string
 * @default 258
 * @desc マップシーン中の受注コマンドのy座標を指定します。
 * 
 * @param AssentingOpacity
 * @text 受注コマンドの枠の不透明度
 * @type string
 * @default 255
 * @desc マップシーン中の受注コマンド枠の不透明度を指定します。0:255
 * 
 * @param AssentingBackOpacity
 * @text 受注コマンドの内背景の不透明度
 * @type string
 * @default 255
 * @desc マップシーン中の受注コマンド内背景の不透明度を指定します。0:255
 * 
 * @param AssentingBackImg
 * @text 受注コマンドの背景レイアウト画像
 * @type struct<AssentingImgSetup>
 * @desc マップシーン中の受注コマンドの背景レイアウト画像を追加します。
 * 
 * @param ReportingX
 * @text 報告コマンドのx座標
 * @type string
 * @default 288
 * @desc マップシーン中の報告コマンドのx座標を指定します。
 * 
 * @param ReportingY
 * @text 報告コマンドのy座標
 * @type string
 * @default 258
 * @desc マップシーン中の報告コマンドのy座標を指定します。
 * 
 * @param ReportingOpacity
 * @text 報告コマンドの枠の不透明度
 * @type string
 * @default 255
 * @desc マップシーン中の報告コマンド枠の不透明度を指定します。0:255
 * 
 * @param ReportingBackOpacity
 * @text 報告コマンドの内背景の不透明度
 * @type string
 * @default 255
 * @desc マップシーン中の報告コマンド内背景の不透明度を指定します。0:255
 * 
 * @param ReportingBackImg
 * @text 報告コマンドの背景レイアウト画像
 * @type struct<ReportingImgSetup>
 * @desc マップシーン中の報告コマンドの背景レイアウト画像を追加します。
 * 
 * @param FilterX
 * @text フィルターコマンドのx座標
 * @type string
 * @default 288
 * @desc クエストメニューのフィルターコマンドのx座標を指定します。
 * 
 * @param FilterY
 * @text フィルターコマンドのy座標
 * @type string
 * @default 204
 * @desc クエストメニューのフィルターコマンドのy座標を指定します。
 * 
 * @param FilterOpacity
 * @text フィルターコマンドの枠の不透明度
 * @type string
 * @default 255
 * @desc クエストメニューのフィルターコマンド枠の不透明度を指定します。0:255
 * 
 * @param FilterBackOpacity
 * @text フィルターコマンドの内背景の不透明度
 * @type string
 * @default 255
 * @desc クエストメニューのフィルターコマンド内背景の不透明度を指定します。0:255
 * 
 * @param FilterBackImg
 * @text フィルターコマンドの背景レイアウト画像
 * @type struct<FilterImgSetup>
 * @desc フィルターコマンドの背景レイアウト画像を追加します。
 * 
 * @param NavCommandX
 * @text ナビ設定コマンドのx座標
 * @type string
 * @default 288
 * @desc クエストメニュー/マップシーン中のナビ設定コマンドのx座標を指定します。
 * 
 * @param NavCommandY
 * @text ナビ設定コマンドのy座標
 * @type string
 * @default 258
 * @desc クエストメニュー/マップシーン中のナビ設定コマンドのy座標を指定します。
 * 
 * @param NavCommandOpacity
 * @text ナビ設定コマンドの枠の不透明度
 * @type string
 * @default 255
 * @desc クエストメニュー/マップシーン中のナビ設定コマンド枠の不透明度を指定します。0:255
 * 
 * @param NavCommandBackOpacity
 * @text ナビ設定コマンドの内背景の不透明度
 * @type string
 * @default 255
 * @desc クエストメニュー/マップシーン中のナビ設定コマンド内背景の不透明度を指定します。0:255
 * 
 * @param NavCommandBackImg
 * @text ナビ設定コマンドの背景レイアウト画像
 * @type struct<NavCommandImgSetup>
 * @desc クエストメニュー/マップシーン中のナビ設定コマンドの背景レイアウト画像を追加します。
 * 
 * @param CancelingX
 * @text 放棄コマンドのx座標
 * @type string
 * @default 288
 * @desc クエストメニューの放棄コマンドのx座標を指定します。
 * 
 * @param CancelingY
 * @text 放棄コマンドのy座標
 * @type string
 * @default 258
 * @desc クエストメニューの放棄コマンドのy座標を指定します。
 * 
 * @param CancelingOpacity
 * @text 放棄コマンドの枠の不透明度
 * @type string
 * @default 255
 * @desc クエストメニューの放棄コマンド枠の不透明度を指定します。0:255
 * 
 * @param CancelingBackOpacity
 * @text 放棄コマンドの内背景の不透明度
 * @type string
 * @default 255
 * @desc クエストメニューの放棄設定コマンド内背景の不透明度を指定します。0:255
 * 
 * @param CancelingBackImg
 * @text 放棄コマンドの背景レイアウト画像
 * @type struct<CancelingImgSetup>
 * @desc クエストメニューの放棄コマンドの背景レイアウト画像を追加します。
 */

/*~struct~ReportingImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※報告コマンド位置からの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※報告コマンド位置からの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~AssentingImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※受注コマンド位置からの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※受注コマンド位置からの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~CancelingImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※放棄コマンド位置からの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※放棄コマンド位置からの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~NavCommandImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※ナビ設定コマンド位置からの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※ナビ設定コマンド位置からの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~FilterImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※フィルターコマンド位置からの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※フィルターコマンド位置からの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~MenuWindowSettings:ja
 * @param HelpWindowX
 * @text ヘルプウィンドウのx座標
 * @type string
 * @default 0
 * @desc クエストメニューのヘルプウィンドウのx座標を指定します。
 * 
 * @param HelpWindowY
 * @text ヘルプウィンドウのy座標
 * @type string
 * @default 566
 * @desc クエストメニューのヘルプウィンドウのy座標を指定します。
 * 
 * @param HelpWindowWidth
 * @text ヘルプウィンドウの横幅
 * @type string
 * @default 816
 * @desc クエストメニューのヘルプウィンドウの横幅を指定します。
 * 
 * @param HelpWindowHeight
 * @text ヘルプウィンドウの縦幅
 * @type string
 * @default 58
 * @desc クエストメニューのヘルプウィンドウの縦幅を指定します。
 * 
 * @param HelpWindowOpacity
 * @text ヘルプウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc クエストメニューのヘルプウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param HelpWindowBackOpacity
 * @text ヘルプウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc クエストメニューのヘルプウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param IconCategoryX
 * @text カテゴリーウィンドウのx座標
 * @type string
 * @default 0
 * @desc クエストメニューのカテゴリーウィンドウのx座標を指定します。
 * 
 * @param IconCategoryY
 * @text カテゴリーウィンドウのy座標
 * @type string
 * @default 0
 * @desc クエストメニューのカテゴリーウィンドウのy座標を指定します。
 * 
 * @param IconCategoryWidth
 * @text カテゴリーウィンドウの横幅
 * @type string
 * @default 326.4
 * @desc クエストメニューのカテゴリーウィンドウの横幅を指定します。
 * 
 * @param IconCategoryHeight
 * @text カテゴリーウィンドウの縦幅
 * @type string
 * @default 102
 * @desc クエストメニューのカテゴリーウィンドウの縦幅を指定します。
 * 
 * @param IconCategoryOpacity
 * @text カテゴリーウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc クエストメニューのカテゴリーウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param IconCategoryBackOpacity
 * @text カテゴリーウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc クエストメニューのカテゴリーウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param IconCategoryLabelX
 * @text カテゴリー名ウィンドウのx座標
 * @type string
 * @default 53.1
 * @desc クエストメニューのカテゴリー名ウィンドウのx座標を指定します。
 * 
 * @param IconCategoryLabelY
 * @text カテゴリー名ウィンドウのy座標
 * @type string
 * @default 36
 * @desc クエストメニューのカテゴリー名ウィンドウのy座標を指定します。
 * 
 * @param IconCategoryLabelWidth
 * @text カテゴリー名ウィンドウの横幅
 * @type string
 * @default 220
 * @desc クエストメニューのカテゴリー名ウィンドウの横幅を指定します。
 * 
 * @param IconCategoryLabelHeight
 * @text カテゴリー名ウィンドウの縦幅
 * @type string
 * @default 78
 * @desc クエストメニューのカテゴリー名ウィンドウの縦幅を指定します。
 * 
 * @param IconCategoryLabelOpacity
 * @text カテゴリー名ウィンドウの枠の不透明度
 * @type string
 * @default 0
 * @desc クエストメニューのカテゴリー名ウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param IconCategoryLabelBackOpacity
 * @text カテゴリー名ウィンドウの内背景の不透明度
 * @type string
 * @default 0
 * @desc クエストメニューのカテゴリー名ウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param QuestListX
 * @text クエストリストウィンドウのx座標
 * @type string
 * @default 0
 * @desc クエストメニューのクエストリストウィンドウのx座標を指定します。
 * 
 * @param QuestListY
 * @text クエストリストウィンドウのy座標
 * @type string
 * @default 102
 * @desc クエストメニューのクエストリストウィンドウのy座標を指定します。
 * 
 * @param QuestListWidth
 * @text クエストリストウィンドウの横幅
 * @type string
 * @default 326.4
 * @desc クエストメニューのクエストリストウィンドウの横幅を指定します。
 * 
 * @param QuestListHeight
 * @text クエストリストウィンドウの縦幅
 * @type string
 * @default 464
 * @desc クエストメニューのクエストリストウィンドウの縦幅を指定します。
 * 
 * @param QuestListOpacity
 * @text クエストリストウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc クエストメニューのクエストリストウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param QuestListBackOpacity
 * @text クエストリストウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc クエストメニューのクエストリストウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param QuestDataX
 * @text クエスト詳細ウィンドウのx座標
 * @type string
 * @default 327.4
 * @desc クエストメニューのクエスト詳細ウィンドウのx座標を指定します。
 * 
 * @param QuestDataY
 * @text クエスト詳細ウィンドウのy座標
 * @type string
 * @default 0
 * @desc クエストメニューのクエスト詳細ウィンドウのy座標を指定します。
 * 
 * @param QuestDataWidth
 * @text クエスト詳細ウィンドウの横幅
 * @type string
 * @default 488
 * @desc クエストメニューのクエスト詳細ウィンドウの横幅を指定します。
 * 
 * @param QuestDataHeight
 * @text クエスト詳細ウィンドウの縦幅
 * @type string
 * @default 566
 * @desc クエストメニューのクエスト詳細ウィンドウの縦幅を指定します。
 * 
 * @param QuestDataOpacity
 * @text クエスト詳細ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc クエストメニューのクエスト詳細ウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param QuestDataBackOpacity
 * @text クエスト詳細ウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc クエストメニューのクエスト詳細ウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param QuestMenuImg
 * @text 背景レイアウト画像
 * @type struct<QuestMenuImgSetup>
 * @desc 背景レイアウト画像を追加します。
 */

/*~struct~QuestMenuImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~MustDataSettings:ja
 * @param flagX
 * @text フラッグ表示x座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのフラッグ表示x座標の調整値を指定します。
 * 
 * @param flagY
 * @text フラッグ表示y座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのフラッグ表示y座標の調整値を指定します。
 * 
 * @param flagFontSize
 * @text フラッグの文字サイズ
 * @type string
 * @default 14
 * @desc 受注条件ウィンドウのフラッグの文字サイズを指定します。
 * 
 * @param questNameX
 * @text クエスト名のx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのクエスト名表示x座標の調整値を指定します。
 * 
 * @param questNameY
 * @text クエスト名のy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのクエスト名表示y座標の調整値を指定します。
 * 
 * @param questNameFontSize
 * @text クエスト名の文字サイズ
 * @type string
 * @default 26
 * @desc 受注条件ウィンドウのクエスト名の文字サイズを指定します。
 * 
 * @param questDifficultyX
 * @text 難易度のx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウの難易度表示x座標の調整値を指定します。
 * 
 * @param questDifficultyY
 * @text 難易度のy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウの難易度表示y座標の調整値を指定します。
 * 
 * @param maxMemberX
 * @text 上限人数のx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウの上限人数表示x座標の調整値を指定します。
 * 
 * @param maxMemberY
 * @text 上限人数のy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウの上限人数表示y座標の調整値を指定します。
 * 
 * @param actorLevelX
 * @text アクターレベルのx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのアクターレベル表示リスト開始x座標の調整値を指定します。
 * 
 * @param actorLevelY
 * @text アクターレベルのy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのアクターレベル表示リスト開始y座標の調整値を指定します。
 * 
 * @param actorLevelNumberX
 * @text アクターレベルの数字x座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのアクターレベルリストの数字表示x座標の調整値を指定します。
 * 
 * @param actorLevelNumberY
 * @text アクターレベルの数字y座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのアクターレベルリストの数字表示y座標の調整値を指定します。
 * 
 * @param actorNeedX
 * @text 必須メンバーのx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウの必須メンバー表示リスト開始x座標の調整値を指定します。
 * 
 * @param actorNeedY
 * @text 必須メンバーのy座標
 * @type string
 * @default 230
 * @desc 受注条件ウィンドウの必須メンバー表示リスト開始y座標の調整値を指定します。
 * 
 * @param actorOutX
 * @text 除外メンバーのx座標
 * @type string
 * @default 190
 * @desc 受注条件ウィンドウの除外メンバー表示リスト開始x座標の調整値を指定します。
 * 
 * @param actorOutY
 * @text 除外メンバーのy座標
 * @type string
 * @default 230
 * @desc 受注条件ウィンドウの除外メンバー表示リスト開始y座標の調整値を指定します。
 * 
 * @param subPageTitleX
 * @text サブページのタイトルのx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページのタイトル表示x座標の調整値を指定します。
 * 
 * @param subPageTitleY
 * @text サブページのタイトルのy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページのタイトル表示y座標の調整値を指定します。
 * 
 * @param subPageTitleFontSize
 * @text サブページのタイトルの文字サイズ
 * @type string
 * @default 14
 * @desc 受注条件ウィンドウのサブページのタイトルの文字サイズを指定します。
 * 
 * @param subPageAreaX
 * @text サブページの活動エリアのx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの活動エリア表示x座標の調整値を指定します。
 * 
 * @param subPageAreaY
 * @text サブページの活動エリアのy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの活動エリア表示y座標の調整値を指定します。
 * 
 * @param subPageSwX
 * @text サブページのスイッチ条件のx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページのスイッチ条件表示x座標の調整値を指定します。
 * 
 * @param subPageSwY
 * @text サブページのスイッチ条件のy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページのスイッチ条件表示y座標の調整値を指定します。
 * 
 * @param subPageValX
 * @text サブページの変数条件のx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの変数条件表示x座標の調整値を指定します。
 * 
 * @param subPageValY
 * @text サブページの変数条件のy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの変数条件表示y座標の調整値を指定します。
 * 
 * @param subPageAssentedX
 * @text サブページの要クエスト受注のx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの要クエスト受注表示x座標の調整値を指定します。
 * 
 * @param subPageAssentedY
 * @text サブページの要クエスト受注のy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの要クエスト受注表示y座標の調整値を指定します。
 * 
 * @param subPageReportedX
 * @text サブページの要クエスト報告のx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの要クエスト報告表示x座標の調整値を指定します。
 * 
 * @param subPageReportedY
 * @text サブページの要クエスト報告のy座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの要クエスト報告表示y座標の調整値を指定します。
 * 
 * @param subPageDetailX
 * @text サブページの受注可能結果のx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのサブページの受注可能結果表示x座標の調整値を指定します。
 * 
 * @param subPageDetailY
 * @text サブページの受注可能結果のy座標
 * @type string
 * @default 120
 * @desc 受注条件ウィンドウのサブページの受注可能結果表示y座標の調整値を指定します。
 */

/*~struct~MustWindowSettings:ja
 * @param MainX
 * @text ウィンドウのx座標
 * @type string
 * @default 0
 * @desc 受注条件ウィンドウのx座標を指定します。
 * 
 * @param MainY
 * @text ウィンドウのy座標
 * @type string
 * @default 72
 * @desc 受注条件ウィンドウのy座標を指定します。
 * 
 * @param MainWidth
 * @text ウィンドウの横幅
 * @type string
 * @default 408
 * @desc 受注条件ウィンドウの横幅を指定します。
 * 
 * @param MainHeight
 * @text ウィンドウの縦幅
 * @type string
 * @default 468
 * @desc 受注条件ウィンドウの縦幅を指定します。
 * 
 * @param MainOpacity
 * @text ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc 受注条件ウィンドウのウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param MainBackOpacity
 * @text ウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc 受注条件ウィンドウのウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param SubX
 * @text サブウィンドウのx座標
 * @type string
 * @default 408
 * @desc 受注条件サブウィンドウのx座標を指定します。
 * 
 * @param SubY
 * @text サブウィンドウのx座標
 * @type string
 * @default 72
 * @desc 受注条件サブウィンドウのy座標を指定します。
 * 
 * @param SubWidth
 * @text サブウィンドウの横幅
 * @type string
 * @default 408
 * @desc 受注条件サブウィンドウの横幅を指定します。
 * 
 * @param SubHeight
 * @text サブウィンドウの縦幅
 * @type string
 * @default 468
 * @desc 受注条件サブウィンドウの縦幅を指定します。
 * 
 * @param SubOpacity
 * @text サブウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc 受注条件サブウィンドウのウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param SubBackOpacity
 * @text サブウィンドウの内背景の不透明度
 * @type string
 * @default 192
 * @desc 受注条件サブウィンドウのウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param MustBackImg
 * @text 背景レイアウト画像
 * @type struct<MustImgSetup>
 * @desc 背景レイアウト画像を追加します。
 */

/*~struct~MustImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※受注条件ウィンドウからの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※受注条件ウィンドウからの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~BoardDataSettings:ja
 * @param titleX
 * @text ボードタイトルのx座標
 * @type string
 * @default 0
 * @desc クエストボードのタイトル表示x座標の調整値を指定します。
 * 
 * @param titleY
 * @text ボードタイトルのy座標
 * @type string
 * @default 0
 * @desc クエストボードのタイトル表示y座標の調整値を指定します。
 * 
 * @param titleFontSize
 * @text ボードタイトルのフォントサイズ
 * @type string
 * @default 26
 * @desc クエストボードのタイトルのフォントサイズを指定します。
 * 
 * @param allLabelY
 * @text 全ラベルy座標
 * @type string
 * @default 10
 * @desc クエスト名、カテゴリー、難易度ラベルのy座標を一度に調整します。
 * 
 * @param questNameX
 * @text クエスト名のx座標
 * @type string
 * @default 95
 * @desc クエスト名のx座標を指定します。
 * 
 * @param questCategoryX
 * @text クエストカテゴリーのx座標
 * @type string
 * @default 280
 * @desc クエストカテゴリーのx座標を指定します。
 * 
 * @param questDifficultyX
 * @text クエスト難易度のx座標
 * @type string
 * @default 195
 * @desc クエスト難易度のx座標を指定します。
 * 
 * @param listNameX
 * @text リストのクエスト名のx座標
 * @type string
 * @default 0
 * @desc クエストボードリストのクエスト名のx座標を調整します。
 * 
 * @param listCategoryX
 * @text リストのカテゴリーのx座標
 * @type string
 * @default 0
 * @desc クエストボードリストのカテゴリーのx座標を調整します。
 * 
 * @param listDifficultyX
 * @text リストの難易度のx座標
 * @type string
 * @default 0
 * @desc クエストボードリストの難易度のx座標を調整します。
 */

/*~struct~BoardWindowSettings:ja
 * @param MainX
 * @text ウィンドウのx座標
 * @type string
 * @default 45
 * @desc クエストボードのx座標を指定します。
 * 
 * @param MainY
 * @text ウィンドウのx座標
 * @type string
 * @default 28
 * @desc クエストボードのy座標を指定します。
 * 
 * @param MainWidth
 * @text ウィンドウの横幅
 * @type string
 * @default 726
 * @desc クエストボードの横幅を指定します。
 * 
 * @param MainHeight
 * @text ウィンドウの縦幅
 * @type string
 * @default 556
 * @desc クエストボードの縦幅を指定します。
 * 
 * @param MainOpacity
 * @text ウィンドウの枠の不透明度
 * @type string
 * @default 255
 * @desc クエストボードのウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param MainBackOpacity
 * @text ウィンドウの内背景の不透明度
 * @type string
 * @default 255
 * @desc クエストボードのウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param ListX
 * @text リストウィンドウのx座標
 * @type string
 * @default 60
 * @desc クエストボードリストのx座標を指定します。
 * 
 * @param ListY
 * @text リストウィンドウのy座標
 * @type string
 * @default 120
 * @desc クエストボードリストのy座標を指定します。
 * 
 * @param ListWidth
 * @text リストウィンドウの横幅
 * @type string
 * @default 696
 * @desc クエストボードリストの横幅を指定します。
 * 
 * @param ListHeight
 * @text リストウィンドウの縦幅
 * @type string
 * @default 422
 * @desc クエストボードリストの縦幅を指定します。
 * 
 * @param ListOpacity
 * @text リストウィンドウの枠の不透明度
 * @type string
 * @default 0
 * @desc クエストボードリストのウィンドウ枠の不透明度を指定します。0:255
 * 
 * @param ListBackOpacity
 * @text リストウィンドウの内背景の不透明度
 * @type string
 * @default 0
 * @desc クエストボードリストのウィンドウ内背景の不透明度を指定します。0:255
 * 
 * @param BoardBackImg
 * @text 背景レイアウト画像
 * @type struct<BoardImgSetup>
 * @desc 背景レイアウト画像を追加します。
 */

/*~struct~BoardImgSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのX座標を指定します。※クエストボードからの調整値。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc ピクチャーのY座標を指定します。※クエストボードからの調整値。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~WinDataSet:ja
 * @param Set1
 * @text 見出し1背景サイズ
 * @type string
 * @default 33
 * @desc クエスト詳細画面の見出し1の背景の大きさ。
 * 
 * @param Set2
 * @text ライン1開始位置
 * @type string
 * @default 34
 * @desc クエスト詳細画面のライン1の開始y座標。
 * 
 * @param Set3
 * @text ライン2開始位置
 * @type string
 * @default 70
 * @desc クエスト詳細画面のライン2の開始y座標。
 * 
 * @param Set4
 * @text 見出し2背景の開始位置
 * @type string
 * @default 71
 * @desc クエスト詳細画面の見出し2背景の開始y座標。
 * 
 * @param Set5
 * @text 見出し2背景サイズ
 * @type string
 * @default 34
 * @desc クエスト詳細画面の見出し2の背景の大きさ。
 * 
 * @param Set6
 * @text ライン3開始位置
 * @type string
 * @default 105
 * @desc クエスト詳細画面のライン3の開始y座標。
 * 
 * @param Set7
 * @text 依頼者ライン開始x位置
 * @type string
 * @default 76
 * @desc クエスト詳細画面の依頼者のラインの開始x座標。
 * 
 * @param Set8
 * @text 依頼者ライン開始y位置
 * @type string
 * @default 139
 * @desc クエスト詳細画面の依頼者のラインの開始y座標。
 * 
 * @param Set9
 * @text 依頼者ライン幅
 * @type string
 * @default 144
 * @desc クエスト詳細画面の依頼者のライン幅。
 * 
 * @param Set10
 * @text 依頼場所ライン開始x位置
 * @type string
 * @default 230
 * @desc クエスト詳細画面の依頼場所のラインの開始x座標。
 * 
 * @param Set11
 * @text 依頼場所ライン開始y位置
 * @type string
 * @default 139
 * @desc クエスト詳細画面の依頼場所のラインの開始y座標。
 * 
 * @param Set12
 * @text 依頼者ライン幅
 * @type string
 * @default 240
 * @desc クエスト詳細画面の依頼者のライン幅。
 * 
 * @param Set13
 * @text ライン4開始位置
 * @type string
 * @default 180
 * @desc クエスト詳細画面のライン4の開始y座標。
 * 
 * @param Set14
 * @text 見出し3背景の開始位置
 * @type string
 * @default 182
 * @desc クエスト詳細画面の見出し3背景の開始y座標。
 * 
 * @param Set15
 * @text 見出し3背景サイズ
 * @type string
 * @default 34
 * @desc クエスト詳細画面の見出し3の背景の大きさ。
 * 
 * @param Set16
 * @text ライン5開始位置
 * @type string
 * @default 279
 * @desc クエスト詳細画面のライン5の開始y座標。
 * 
 * @param Set17
 * @text 見出し4背景の開始位置
 * @type string
 * @default 281
 * @desc クエスト詳細画面の見出し4背景の開始y座標。
 * 
 * @param Set18
 * @text 見出し4背景サイズ
 * @type string
 * @default 34
 * @desc クエスト詳細画面の見出し4の背景の大きさ。
 * 
 * @param Set19
 * @text ライン6開始位置
 * @type string
 * @default 142
 * @desc クエスト詳細画面のライン6の開始y座標。
 */

/*~struct~WinNeededSet:ja
 * @param Set1
 * @text 見出し1背景サイズ
 * @type string
 * @default 33
 * @desc クエスト必須条件の見出し1の背景の大きさ。
 * 
 * @param Set2
 * @text ライン1開始位置
 * @type string
 * @default 34
 * @desc クエスト必須条件のライン1の開始y座標。
 * 
 * @param Set3
 * @text ライン2開始位置
 * @type string
 * @default 70
 * @desc クエスト必須条件のライン2の開始y座標。
 * 
 * @param Set4
 * @text レベルライン開始x位置
 * @type string
 * @default 0
 * @desc クエスト必須条件の受注可能レベルのライン開始x座標。
 * 
 * @param Set5
 * @text レベルライン開始y位置
 * @type string
 * @default 110
 * @desc クエスト必須条件の受注可能レベルのライン開始y座標。
 * 
 * @param Set6
 * @text レベルライン幅
 * @type string
 * @default 170
 * @desc クエスト必須条件の受注可能レベルのライン幅。
 * 
 * @param Set7
 * @text 上限人数ライン開始x位置
 * @type string
 * @default 190
 * @desc クエスト必須条件の受注可能上限人数のライン開始x座標。
 * 
 * @param Set8
 * @text 上限人数ライン開始y位置
 * @type string
 * @default 110
 * @desc クエスト必須条件の受注可能上限人数のライン開始y座標。
 * 
 * @param Set9
 * @text 上限人数ライン幅
 * @type string
 * @default 190
 * @desc クエスト必須条件の受注可能上限人数のライン幅。
 * 
 * @param Set10
 * @text 必須メンバーライン開始x位置
 * @type string
 * @default 0
 * @desc クエスト必須条件の必須メンバーのライン開始x座標。
 * 
 * @param Set11
 * @text 必須メンバーライン開始y位置
 * @type string
 * @default 38
 * @desc クエスト必須条件の必須メンバーのライン開始y座標。
 * 
 * @param Set12
 * @text 必須メンバーライン幅
 * @type string
 * @default 170
 * @desc クエスト必須条件の必須メンバーのライン幅。
 * 
 * @param Set13
 * @text 除外メンバーライン開始x位置
 * @type string
 * @default 0
 * @desc クエスト必須条件の除外メンバーのライン開始x座標。
 * 
 * @param Set14
 * @text 除外メンバーライン開始y位置
 * @type string
 * @default 38
 * @desc クエスト必須条件の除外メンバーのライン開始y座標。
 * 
 * @param Set15
 * @text 除外メンバーライン幅
 * @type string
 * @default 190
 * @desc クエスト必須条件の除外メンバーのライン幅。
 * 
 * @param Set16
 * @text 見出し2背景サイズ
 * @tyep string
 * @default 33
 * @desc クエスト必須条件の見出し2の背景の大きさ
 * 
 * @param Set17
 * @text ライン3開始位置
 * @type string
 * @default 34
 * @desc クエスト必須条件のライン3の開始y座標。
 * 
 * @param Set18
 * @text ライン4開始位置
 * @type string
 * @default 70
 * @desc クエスト必須条件のライン4の開始y座標。
 * 
 * @param Set19
 * @text ライン5開始位置
 * @type string
 * @default -40
 * @desc クエスト必須条件のライン5の開始調整y座標。
 */

/*~struct~WinBoardSet:ja
 * @param Set1
 * @text 見出し1背景サイズ
 * @type string
 * @default 33
 * @desc クエストボードの見出し1の背景の大きさ。
 * 
 * @param Set2
 * @text 見出し2背景開始位置
 * @type string
 * @default 35
 * @desc クエストボードの見出し2の背景開始y座標。
 * 
 * @param Set3
 * @text 見出し2背景サイズ
 * @type string
 * @default 14
 * @desc クエストボードの見出し2の背景の大きさ。
 * 
 * @param Set4
 * @text ライン1開始位置
 * @type string
 * @default 49
 * @desc クエストボードのライン1の開始y座標。
 * 
 * @param Set5
 * @text ライン2開始位置
 * @type string
 * @default 80
 * @desc クエストボードのライン2の開始y座標。
 */

/*~struct~WinDesignSet:ja
 * @param UseAll
 * @text デザインを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc 全体のデザイン使用フラグです。
 * 
 * @param UseBoard
 * @text クエストボードで使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc クエストボード個別使用フラグです。全体が使用中に限り、設定を反映します。
 * 
 * @param UseNeeded
 * @text 必須条件で使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc クエスト必須条件ウィンドウ個別使用フラグです。全体が使用中に限り、設定を反映します。
 * 
 * @param UseData
 * @text クエスト詳細で使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @desc クエスト詳細ウィンドウ個別使用フラグです。全体が使用中に限り、設定を反映します。
 */

//=============================================================================
//  【QuestDatabase】
//=============================================================================

/*~struct~QuestDatabase:ja
 * @param QuestInfo
 * @text クエスト情報
 * 
 * @param QuestOrderConditions
 * @text クエスト受注条件
 * 
 * @param QuestInfos
 * @text クエストの説明
 * 
 * @param QuestObjectiveSettings
 * @text 目的設定
 * @type struct<QuestObjectiveData>[]
 * @desc クエストの目的を設定します。※目的の種類がクエストオブジェクトなら目的の設定は指定不要。複数指定可
 * 
 * @param QuestRewards
 * @text クエスト達成時の報酬
 * 
 * @param QuestName
 * @text クエスト名
 * @parent QuestInfo
 * @type String
 * @default クエスト1
 * @desc クエスト名を設定します。
 * 
 * @param QuestFlagID
 * @text フラッグID
 * @parent QuestInfo
 * @type number
 * @default 0
 * @desc 基本設定の「フラッグラベルの設定」にて設定したフラッグIDを設定します。IDは登録順に 0、1、2...etc となります。
 * 
 * @param RootQuest
 * @text ルートクエスト
 * @parent QuestInfo
 * @type boolean
 * @on ルートクエスト
 * @off 通常クエスト
 * @default false
 * @desc 対象クエストの目的設定順にクエストを進行するクエストです。進行中の目的以外は表示されません。
 * 
 * @param QuestIconSetting
 * @text クエストアイコン
 * @parent QuestInfo
 * @type struct<QuestIconSetup>
 * @desc クエストのフラッグ名の左に表示されるアイコンを設定します。
 * 
 * @param QuestBoardID
 * @text クエストボードID
 * @parent QuestInfo
 * @type number[]
 * @default ["0"]
 * @desc クエストの表示条件を満たしている場合に、指定ボードIDへ表示します。未設定でボードID:0以外に表示しない。※複数指定可
 * 
 * @param NpcOnly
 * @text NPC限定
 * @parent QuestInfo
 * @type boolean
 * @on NPC限定
 * @off 非NPC限定。
 * @default false
 * @desc NPC限定クエストにするか指定します。非NPC限定の場合、表示条件を満たせばクエストボードに表示されます。
 * 
 * @param QuestCategory
 * @text クエストフィルタリングカテゴリー
 * @parent QuestInfo
 * @type string[]
 * @default ["cat1"]
 * @desc 基本設定のクエストカテゴリーのcatIDを指定。cat0にはすべてのクエストが登録されますので指定は不要。※複数指定可
 * 
 * @param QuestDifficulty
 * @text クエスト難易度
 * @parent QuestInfo
 * @type struct<QuestDifficultySetup>
 * @desc クエストの難易度を指定します。
 * 
 * @param QuestClient
 * @text 依頼者情報
 * @parent QuestInfo
 * @type struct<QuestClientSetup>
 * @desc クエストの依頼者情報を設定します。
 * 
 * @param DailyQuest
 * @text デイリークエスト
 * @parent QuestInfo
 * @type boolean
 * @on デイリークエスト
 * @off 通常クエスト
 * @default false
 * @desc 毎日PC時間0:00からクリア済みのクエストを放棄時詳細設定を使用しリセットします。※失敗モード時は失敗していてもリセット。
 * 
 * @param AutoReport
 * @text 自動報告
 * @parent QuestInfo
 * @type boolean
 * @on 自動報告
 * @off NPCに報告義務あり
 * @default false
 * @desc クエストの目的をすべてクリアすると、その場で自動的に報告します。
 * 
 * @param QuestActivateSetup
 * @text 受注時詳細設定
 * @parent QuestInfo
 * @type struct<QuestActivateSettings>
 * @desc クエスト受注時のセルフスイッチ/スイッチ/変数、親子クエストの設定をします。※親子クエストは未設定で使用しない。
 * 
 * @param QuestCancelSetup
 * @text 放棄時詳細設定
 * @parent QuestInfo
 * @type struct<QuestCancelSettings>
 * @desc クエストを途中放棄可能にするかを指定。報告済みクエストは放棄不可。
 * 
 * @param QuestClearedSetup
 * @text 達成時詳細設定
 * @parent QuestInfo
 * @type struct<QuestClearedSettings>
 * @desc クエスト達成時のセルフスイッチ/スイッチ/変数/コモンイベントを指定。
 * 
 * @param QuestFailedSetup
 * @text 失敗時詳細設定
 * @parent QuestInfo
 * @type struct<QuestFailedSettings>
 * @desc クエスト失敗時のセルフスイッチ/スイッチ/変数/コモンイベントを指定。
 * 
 * @param ActorLevel
 * @text アクター必要レベル
 * @parent QuestOrderConditions
 * @type struct<QuestOrderNeedActorLevel>[]
 * @desc アクターのレベルが設定レベル含む以上。未設定で使用しない。※複数指定可で1番に設定したアクターをリーダーとして扱います。
 * 
 * @param NeedMembers
 * @text 必須メンバー
 * @parent QuestOrderConditions
 * @type actor[]
 * @desc クエスト受注に必須なアクターを指定します。未設定で使用しない。※複数指定可
 * 
 * @param OutMembers
 * @text 除外必須メンバー
 * @parent QuestOrderConditions
 * @type actor[]
 * @desc クエスト受注に除外必須なアクターを指定します。未設定で使用しない。※複数指定可
 * 
 * @param MaxMember
 * @text 上限人数
 * @parent QuestOrderConditions
 * @type number
 * @default 0
 * @desc このメンバーを上回る人数での受注は不可。0で不問。
 * 
 * @param SwitchConditions
 * @text 必須スイッチ状態
 * @parent QuestOrderConditions
 * @type struct<QuestNeedOrderSwSetup>[]
 * @desc 受注に必要なスイッチの状態を指定します。未設定で使用しない。※複数指定可
 * 
 * @param ValConditions
 * @text 必須変数状態
 * @parent QuestOrderConditions
 * @type struct<QuestNeedOrderValSetup>[]
 * @desc 受注に必要な変数の状態を指定します。未設定で使用しない。※複数指定可
 * 
 * @param NeedAssentedQuests
 * @text 必須受注クエスト
 * @parent QuestOrderConditions
 * @type number[]
 * @min 1
 * @desc 受注に必要な受注済みクエストIDを指定します。未設定で使用しない。※複数指定可
 * 
 * @param NeedClearedQuests
 * @text 必須報告済みクエスト
 * @parent QuestOrderConditions
 * @type number[]
 * @min 1
 * @desc 受注に必要な報告済みクエストIDを指定します。未設定で使用しない。※複数指定可
 * 
 * @param PlaceInformation
 * @text クエストの主な活動エリア
 * @parent QuestInfos
 * @type string
 * @desc クエストの主な活動エリアを指定します。
 * 
 * @param QuestContent
 * @text クエストの概要
 * @parent QuestInfos
 * @type note
 * @desc クエストの概要。制御文字使用可能です。改行も受け付けます。
 * 
 * @param QuestClearContent
 * @text 目的達成後の文章
 * @parent QuestInfos
 * @type note
 * @desc クリア目的数がすべて達成時に文字を表示します。未設定で使用しない。
 * 
 * @param QuestRewardGold
 * @text 報酬額
 * @parent QuestRewards
 * @type number
 * @default 0
 * @desc 報酬額を指定。0で使用しない。
 * 
 * @param QuestLoseGold
 * @text 減額
 * @parent QuestRewards
 * @type number
 * @default 0
 * @desc 報酬額を指定。0で使用しない。
 * 
 * @param QuestRewardExp
 * @text 報酬経験値
 * @parent QuestRewards
 * @type number
 * @default 0
 * @desc 報酬経験値量を指定。0で使用しない。
 * 
 * @param QuestLoseExp
 * @text 減る経験値
 * @parent QuestRewards
 * @type number
 * @default 0
 * @desc 減る経験値量を指定。0で使用しない。
 * 
 * @param QuestRewardItem
 * @text 報酬アイテム
 * @parent QuestRewards
 * @type struct<QuestRewardItems>[]
 * @desc 報酬を指定。一つずつ追加してください。未設定で使用しない。
 * 
 * @param QuestLoseItem
 * @text 減るアイテム
 * @parent QuestRewards
 * @type struct<QuestLoseItems>[]
 * @desc 減るアイテムを指定。一つずつ追加してください。未設定で使用しない。
 */

/*~struct~QuestFailedSettings:ja
 * @param FailedSelfSw
 * @text 失敗時セルフスイッチ操作
 * @type struct<QuestFailedSelfSwSetup>[]
 * @desc クエスト失敗時にセルフスイッチ操作。未設定で使用しない。※複数指定可
 * 
 * @param FailedSw
 * @text 失敗時スイッチ操作
 * @type struct<QuestFailedSwSetup>[]
 * @desc クエスト失敗時にスイッチ操作。未設定で使用しない。※複数指定可
 * 
 * @param FailedVal
 * @text 失敗時変数操作
 * @type struct<QuestFailedValSetup>[]
 * @desc クエスト失敗時に変数操作。未設定で使用しない。※複数指定可
 * 
 * @param FailedCommonEvent
 * @text 失敗時コモンイベント
 * @type common_event
 * @desc クエスト失敗時に起動するコモンイベント。未設定で使用しない。
 */

/*~struct~QuestClearedSettings:ja
 * @param ClearedSelfSw
 * @text 達成時セルフスイッチ操作
 * @type struct<QuestClearedSelfSwSetup>[]
 * @desc クエスト達成時にセルフスイッチ操作。未設定で使用しない。※複数指定可
 * 
 * @param ClearedSw
 * @text 達成時スイッチ操作
 * @type struct<QuestClearedSwSetup>[]
 * @desc クエスト達成時にスイッチ操作。未設定で使用しない。※複数指定可
 * 
 * @param ClearedVal
 * @text 受注時変数操作
 * @type struct<QuestClearedValSetup>[]
 * @desc クエスト達成時に変数操作。未設定で使用しない。※複数指定可
 * 
 * @param ClearedCommonEvent
 * @text 達成時コモンイベント
 * @type common_event
 * @desc クエストクリア時に起動するコモンイベント。未設定で使用しない。
 */

/*~struct~QuestLoseItems:ja
 * @param UseWitchItem
 * @text アイテムの種類
 * @type select
 * @option アイテム
 * @value Item
 * @option 武器
 * @value Weapon
 * @option 防具
 * @value Armor
 * @default Item
 * @desc 減る対象のアイテムの種類を選択します。
 * 
 * @param SelectedItem
 * @text アイテムID
 * @type item
 * @desc アイテムの種類がアイテムの場合に指定。
 * 
 * @param SelectedWeapon
 * @text 武器ID
 * @type weapon
 * @desc アイテムの種類が武器の場合に指定。
 * 
 * @param SelectedArmor
 * @text 防具ID
 * @type armor
 * @desc アイテムの種類が防具の場合に指定。
 * 
 * @param Amount
 * @text 減る数
 * @type number
 * @desc 指定アイテムの減る数を設定します。
 */

/*~struct~QuestRewardItems:ja
 * @param UseWitchItem
 * @text アイテムの種類
 * @type select
 * @option アイテム
 * @value Item
 * @option 武器
 * @value Weapon
 * @option 防具
 * @value Armor
 * @default Item
 * @desc 獲得対象のアイテムの種類を選択します。
 * 
 * @param SelectedItem
 * @text アイテムID
 * @type item
 * @desc アイテムの種類がアイテムの場合に指定。
 * 
 * @param SelectedWeapon
 * @text 武器ID
 * @type weapon
 * @desc アイテムの種類が武器の場合に指定。
 * 
 * @param SelectedArmor
 * @text 防具ID
 * @type armor
 * @desc アイテムの種類が防具の場合に指定。
 * 
 * @param Amount
 * @text 獲得数
 * @type number
 * @desc 指定アイテムの獲得数を設定します。
 */

/*~struct~QuestObjectiveData:ja
 * @param ObjectiveIcons
 * @text アイコンID
 * @type struct<ObjectiveIconSetup>
 * @desc アイコンIndex番号を指定します。
 * 
 * @param ObjectiveTypes
 * @text 目的の種類
 * @type select
 * @option クエストオブジェクト
 * @value questobj
 * @option 討伐
 * @value killquest
 * @option 変数比較
 * @value valquest
 * @option アイテム所持
 * @value itemquest
 * @option 特定クエストクリア
 * @value selectedquestcleared
 * @default questobj
 * @desc スクリプトコマンドのクエストオブジェクト型、討伐型、変数指定型、アイテム獲得型、特定クエストクリア型から選びます。
 * 
 * @param ObjectiveID
 * @text 目的の設定
 * @type struct<ObjectiveTargets>
 * @desc 目的の種類に従い、討伐→敵ID、変数比較→変数ID、アイテム所持→アイテム設定、特定クエストクリア→クリアクエストIDを設定。
 * 
 * @param ObjectiveContent
 * @text 目的の概要
 * @type note
 * @default "目的の概要内容。"
 * @desc 簡易的な目的の説明を記入します。制御文字(文字サイズ以外)/改行を受け付けますが2行までを想定しています。
 * 
 * @param ObjectiveFinishAmount
 * @text クリア目的数
 * @type number
 * @min 1
 * @desc クリア目的数を設定。目的の種類が特定クエストクリアの場合、値を1にしてください。1以上の場合、クリアできなくなります。
 * 
 * @param ClearCommonEvent
 * @text 達成時コモンイベント
 * @type common_event
 * @desc 対象目的を達成した際、一度だけコモンイベントを起動します。
 */

/*~struct~ObjectiveTargets:ja
 * @param TargetEnemyID
 * @text 敵ID
 * @type enemy
 * @desc 討伐対象の敵IDを設定します。※トループIDではありません。
 * 
 * @param TargetValID
 * @text 変数ID
 * @type variable
 * @desc 比較対象の変数IDを設定します。
 * 
 * @param TargetItemID
 * @text アイテム設定
 * @type struct<TargetItemSetup>
 * @desc 一種類且つ、一つしか対象を設定できません。
 * 
 * @param TargetQuestID
 * @text クリアクエストID
 * @type number
 * @min 1
 * @desc 対象クエストIDを指定してください。一つしか設定できません。
 */

/*~struct~TargetItemSetup:ja
 * @param UseWitchItem
 * @text アイテムの種類
 * @type select
 * @option アイテム
 * @value Item
 * @option 武器
 * @value Weapon
 * @option 防具
 * @value Armor
 * @default Item
 * @desc 所持対象のアイテムの種類を選択します。
 * 
 * @param SelectedItem
 * @text アイテムID
 * @type item
 * @desc アイテムの種類がアイテムの場合に指定。
 * 
 * @param SelectedWeapon
 * @text 武器ID
 * @type weapon
 * @desc アイテムの種類が武器の場合に指定。
 * 
 * @param SelectedArmor
 * @text 防具ID
 * @type armor
 * @desc アイテムの種類が防具の場合に指定。
 */

/*~struct~ObjectiveIconSetup:ja
 * @param ObjectiveActivatedIcon
 * @text 進行中アイコン
 * @type number
 * @min -1
 * @default 67
 * @desc 目的進行中に表示されるアイコンを指定。-1で非表示。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param ObjectiveClearedIcon
 * @text 達成アイコン
 * @type number
 * @min -1
 * @default 72
 * @desc 目的達成時に表示されるアイコンを指定。-1で非表示。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param ObjectiveFailedIcon
 * @text 失敗時アイコン
 * @type number
 * @min -1
 * @default 1
 * @desc 目的失敗時に表示されるアイコンを指定。-1で非表示。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 */

/*~struct~QuestNeedOrderValSetup:ja
 * @param Val
 * @text 変数
 * @type variable
 * @default 1
 * @desc 変数状態を比較する変数ID。
 * 
 * @param ValCondition
 * @text 条件
 * @type select
 * @option より上、超
 * @value mt
 * @option 以上
 * @value imt
 * @option より下、未満
 * @value lt
 * @option 以下
 * @value ilt
 * @option 丁度
 * @value just
 * @option 文字列比較
 * @value stringcheck
 * @default stringcheck
 * @desc 変数をどのような条件で判定するか指定。文字列を扱う場合、必ず文字列比較にしてください。
 * 
 * @param ValValue
 * @text 値の状態
 * @type string
 * @desc 比較する変数の値。文字を扱う場合、''(シングルクォート)で囲ってください。
 */

/*~struct~QuestNeedOrderSwSetup:ja
 * @param SwID
 * @text スイッチID
 * @type switch
 * @default 1
 * @desc スイッチ状態を比較するスイッチID。
 * 
 * @param SwBoolean
 * @text スイッチ状態
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestOrderNeedActorLevel:ja
 * @param Actor
 * @text 対象アクター
 * @type actor
 * @desc 対象アクターを選択します。
 * 
 * @param ActorLevel
 * @text 必須レベル
 * @type number
 * @min 1
 * @default 1
 * @desc 必須レベルを指定します。
 */

/*~struct~QuestCancelSettings:ja
 * @param CancelLock
 * @text クエスト放棄禁止
 * @type boolean
 * @on 放棄禁止
 * @off 放棄可能
 * @default false
 * @desc クエストを途中放棄可能にするかを指定。
 * 
 * @param CancelSelfSw
 * @text 放棄時セルフスイッチ操作
 * @type struct<QuestCancelSelfSwSetup>[]
 * @desc クエスト放棄時にセルフスイッチ操作。未設定で使用しない。※複数指定可
 * 
 * @param CancelSw
 * @text 放棄時スイッチ操作
 * @type struct<QuestCancelSwSetup>[]
 * @desc クエスト放棄時にスイッチ操作。未設定で使用しない。※複数指定可
 * 
 * @param CancelVal
 * @text 放棄時変数操作
 * @type struct<QuestCancelValSetup>[]
 * @desc クエスト放棄時に変数操作。未設定で使用しない。※複数指定可
 */

/*~struct~QuestActivateSettings:ja
 * @param AutoAddQuests
 * @text クエスト追加受注「親子クエスト」
 * @type number[]
 * @min 1
 * @desc クエスト受注時に自動的に受注するクエスト。クエストIDを指定。追加受注に指定されたクエストは受注条件を無視し受注します。
 * 
 * @param ActivateSelfSw
 * @text 受注時セルフスイッチ操作
 * @type struct<QuestActivateSelfSwSetup>[]
 * @desc クエスト受注時にセルフスイッチ操作。未設定で使用しない。※複数指定可
 * 
 * @param ActivateSw
 * @text 受注時スイッチ操作
 * @type struct<QuestActivateSwSetup>[]
 * @desc クエスト受注時にスイッチ操作。未設定で使用しない。※複数指定可
 * 
 * @param ActivateVal
 * @text 受注時変数操作
 * @type struct<QuestActivateValSetup>[]
 * @desc クエスト受注時に変数操作。未設定で使用しない。※複数指定可
 */

/*~struct~QuestActivateValSetup:ja
 * @param ActivateVal
 * @text 変数
 * @type variable
 * @default 1
 * @desc 変数操作を行う変数ID。
 * 
 * @param ValCondition
 * @text 条件
 * @type select
 * @option 加算
 * @value add
 * @option 減算
 * @value sub
 * @option 代入
 * @value ins
 * @default ins
 * @desc 変数にどのように挿入するか条件を指定。文字列を扱う場合、必ず代入にしてください。
 * 
 * @param ValValue
 * @text 値の設定
 * @type string
 * @desc 変数に挿入する値。文字を扱う場合、''(シングルクォート)で囲ってください。
 */

/*~struct~QuestCancelValSetup:ja
 * @param ActivateVal
 * @text 変数
 * @type variable
 * @default 1
 * @desc 変数操作を行う変数ID。
 * 
 * @param ValCondition
 * @text 条件
 * @type select
 * @option 加算
 * @value add
 * @option 減算
 * @value sub
 * @option 代入
 * @value ins
 * @default ins
 * @desc 変数にどのように挿入するか条件を指定。文字列を扱う場合、必ず代入にしてください。
 * 
 * @param ValValue
 * @text 値の設定
 * @type string
 * @desc 変数に挿入する値。文字を扱う場合、''(シングルクォート)で囲ってください。
 */

/*~struct~QuestFailedValSetup:ja
 * @param ActivateVal
 * @text 変数
 * @type variable
 * @default 1
 * @desc 変数操作を行う変数ID。
 * 
 * @param ValCondition
 * @text 条件
 * @type select
 * @option 加算
 * @value add
 * @option 減算
 * @value sub
 * @option 代入
 * @value ins
 * @default ins
 * @desc 変数にどのように挿入するか条件を指定。文字列を扱う場合、必ず代入にしてください。
 * 
 * @param ValValue
 * @text 値の設定
 * @type string
 * @desc 変数に挿入する値。文字を扱う場合、''(シングルクォート)で囲ってください。
 */

/*~struct~QuestClearedValSetup:ja
 * @param ActivateVal
 * @text 変数
 * @type variable
 * @default 1
 * @desc 変数操作を行う変数ID。
 * 
 * @param ValCondition
 * @text 条件
 * @type select
 * @option 加算
 * @value add
 * @option 減算
 * @value sub
 * @option 代入
 * @value ins
 * @default ins
 * @desc 変数にどのように挿入するか条件を指定。文字列を扱う場合、必ず代入にしてください。
 * 
 * @param ValValue
 * @text 値の設定
 * @type string
 * @desc 変数に挿入する値。文字を扱う場合、''(シングルクォート)で囲ってください。
 */

/*~struct~QuestActivateSwSetup:ja
 * @param ActivateSwID
 * @text スイッチID
 * @type switch
 * @default 1
 * @desc スイッチ操作を行うスイッチID。
 * 
 * @param SwBoolean
 * @text スイッチ設定
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestCancelSwSetup:ja
 * @param ActivateSwID
 * @text スイッチID
 * @type switch
 * @default 1
 * @desc スイッチ操作を行うスイッチID。
 * 
 * @param SwBoolean
 * @text スイッチ設定
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestFailedSwSetup:ja
 * @param ActivateSwID
 * @text スイッチID
 * @type switch
 * @default 1
 * @desc スイッチ操作を行うスイッチID。
 * 
 * @param SwBoolean
 * @text スイッチ設定
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestClearedSwSetup:ja
 * @param ActivateSwID
 * @text スイッチID
 * @type switch
 * @default 1
 * @desc スイッチ操作を行うスイッチID。
 * 
 * @param SwBoolean
 * @text スイッチ設定
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestActivateSelfSwSetup:ja
 * @param MapID
 * @text マップID
 * @type number
 * @desc セルフスイッチ操作を行う対象が配置されているマップID。
 * 
 * @param EventID
 * @text イベントID
 * @type number
 * @desc セルフスイッチ操作を行う対象イベントID。
 * 
 * @param SwitchType
 * @text スイッチの種類
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @default A
 * @desc A～Dのどのセルフスイッチを操作するか指定します。
 * 
 * @param SelfSwBoolean
 * @text スイッチ設定
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestCancelSelfSwSetup:ja
 * @param MapID
 * @text マップID
 * @type number
 * @desc セルフスイッチ操作を行う対象が配置されているマップID。
 * 
 * @param EventID
 * @text イベントID
 * @type number
 * @desc セルフスイッチ操作を行う対象イベントID。
 * 
 * @param SwitchType
 * @text スイッチの種類
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @default A
 * @desc A～Dのどのセルフスイッチを操作するか指定します。
 * 
 * @param SelfSwBoolean
 * @text スイッチ設定
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestFailedSelfSwSetup:ja
 * @param MapID
 * @text マップID
 * @type number
 * @desc セルフスイッチ操作を行う対象が配置されているマップID。
 * 
 * @param EventID
 * @text イベントID
 * @type number
 * @desc セルフスイッチ操作を行う対象イベントID。
 * 
 * @param SwitchType
 * @text スイッチの種類
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @default A
 * @desc A～Dのどのセルフスイッチを操作するか指定します。
 * 
 * @param SelfSwBoolean
 * @text スイッチ設定
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestClearedSelfSwSetup:ja
 * @param MapID
 * @text マップID
 * @type number
 * @desc セルフスイッチ操作を行う対象が配置されているマップID。
 * 
 * @param EventID
 * @text イベントID
 * @type number
 * @desc セルフスイッチ操作を行う対象イベントID。
 * 
 * @param SwitchType
 * @text スイッチの種類
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @default A
 * @desc A～Dのどのセルフスイッチを操作するか指定します。
 * 
 * @param SelfSwBoolean
 * @text スイッチ設定
 * @type boolean
 * @desc true/falseを指定します。
 */

/*~struct~QuestClientSetup:ja
 * @param QuestClientName
 * @text 依頼者名
 * @type string
 * @desc クエストの依頼者名を指定します。
 * 
 * @param QuestLocation
 * @text 依頼場所
 * @type string
 * @desc クエストの依頼場所を指定します。
 * 
 * @param QuestClientSprite
 * @text 依頼者歩行グラ設定
 * @type struct<QuestClientSpriteSetup>
 * @desc 依頼者の歩行グラフィックの設定します。
 * 
 * @param QuestClientPicture
 * @text ピクチャー設定
 * @type struct<QuestClientPictureSetup>
 * @desc ピクチャーを依頼者として追加します。
 */

/*~struct~QuestClientSpriteSetup:ja
 * @param SpriteName
 * @text 歩行グラ画像名
 * @type file
 * @dir img/characters/
 * @default Actor1
 * @desc 歩行グラフィック名を指定します。
 * 
 * @param SpriteIndex
 * @text Index番号
 * @type number
 * @default 0
 * @desc 歩行グラフィックのindex番号を指定します。
 * 
 * @param SpriteX
 * @text 歩行グラX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc 歩行グラフィック表示位置からX座標の調整値を指定します。
 * 
 * @param SpriteY
 * @text 歩行グラY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc 歩行グラフィック表示位置からY座標の調整値を指定します。
 */

/*~struct~QuestClientPictureSetup:ja
 * @param UsePicture
 * @text ピクチャーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc ピクチャーを使用するかの指定をします。
 * 
 * @param PictureFile
 * @text ピクチャーのファイル
 * @type file
 * @dir img/quests
 * @desc ピクチャーファイルを設定します。
 * 
 * @param PictureX
 * @text ピクチャーのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc アイコン位置からX座標の調整値を指定します。
 * 
 * @param PictureY
 * @text ピクチャーのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc アイコン位置からY座標の調整値を指定します。
 * 
 * @param PictureOpacity
 * @text ピクチャーの不透明度
 * @type number
 * @default 255
 * @desc ピクチャーの不透明度を指定します。
 * 
 * @param PictureAnchor
 * @text アンカーを使用
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default false
 * @desc 画像の中心を座標に合わせるかの指定します。しない場合は、画像の左上を座標に合わせます。
 */

/*~struct~QuestDifficultySetup:ja
 * @param DifficultyText
 * @text 難易度(テキスト)
 * @type string
 * @desc 色は基本設定の「クエスト詳細の設定」で指定。未設定で非表示。
 * 
 * @param TextX
 * @text テキストX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc テキスト表示位置からX座標の調整値を指定します。
 * 
 * @param TextY
 * @text テキストY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc テキスト表示位置からY座標の調整値を指定します。
 * 
 * @param IconsetID
 * @text 難易度(アイコン群ID)
 * @type number
 * @min -1
 * @default 0
 * @desc 基本設定の「クエスト詳細の設定/難易度の表示設定/難易度アイコン群」のID。IDは登録順で 0、1、2...etc -1で非表示。
 */

/*~struct~QuestIconSetup:ja
 * @param QuestIconID
 * @text アイコン
 * @type number
 * @min -1
 * @default -1
 * @desc クエスト専用アイコンindex番号を指定。-1で非表示。アイコンリスト:テキストタブの入力欄で右クリメニューから開けます。
 * 
 * @param QuestIconX
 * @text アイコンのX座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc アイコン位置からX座標の調整値を指定します。
 * 
 * @param QuestIconY
 * @text アイコンのY座標
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc アイコン位置からY座標の調整値を指定します。
 */

//=============================================================================
//
// - 英語ここから -
//
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc High Quality Quest System MVMZ v1.05
 * Adding quest system function.
 * @author Ayatam (Another Young Animations)
 * 
 * @help ■ High Qualtiy Quest System MVMZ
 * this plugin is supported over MV Core ver 1.6.3
 * and MZ Core ver 1.4.3
 * I want to thank Mako for translation help.
 * 
 * 【use of terms】
 * ・Remodeling this plugin is allowed but Reposting is prohibited.
 * ・I`ll not fix this plugin if the error reason is from anther plugin.
 * ・I`ll fix the error if the problem is from this plugin it self, 
 *   but I`ll not take responsible for it.
 * ・fell free to use in non commercial or commercial games.
 *   and for adult games as well.
 * 
 * 【when you are using this plugin please do what it saids bellow】
 * ・write my Name and Website name and Url in to your games readme.
 * 
 *   Name: ayatam
 *   Website name: Another Young Animations 公式サイト
 *   URL: https://ayatam.wixsite.com/index
 * 
 * =============================================================================
 *  【How to use】
 *  ・first setup 'Global Settings' and 'Customize Settings' for your game.
 *    then start creating 'Quest Database' then you are ready to use.
 *    at least you need one quest to start.
 *    if you setup wrong with the quest, 
 *    this plugin will pop up an console and show what you have missed.
 *  ・use script command below and register quest system in your game.
 *  ・there is no plugin command, it is only script commands.
 * 
 *  【Specification】
 *  ・it`s not created for smortphone games.
 *  ・I have removed window mask in Map scene,
 *    if you need window mask then I don`t recommend you to use this plugin.
 * 
 *  【Img file path for quest system】
 *    img/quests/
 *    please create this folder in order to use imgs in the quest system.
 * -----------------------------------------------------------------------------
 *  【how to take backup for quest system】
 *   1.first open 'Quest Database',
 *     and you will find the list of quests that you have created.
 * 
 *   2.in that window open text tab
 *     and copy&paste the showing code somewhere safe.
 *     then you are done creating backup for 'Quest Database'.
 * 
 *  【how to reopen your backup】
 *   1.get your code witch you have copy&pasted above
 *     and paste that code where you copied from.
 *     if it`s 'Quest Database' list backup,
 *     then paste it in quest list text tab.
 *     then you will be able to reopen your backup.
 * 
 *    * you could do the same with
 *     'Global Settings' and 'Customize Settings'.
 * 
 * -----------------------------------------------------------------------------
 *  【this is the web site to help you setup color code】*japanese website.
 *  ・RPGツクールMVのシステムカラーのカラーコード表
 *    https://www.ssaits.jp/blog/system/game/tkool/font-color.html
 *  ・カラーコード生成サイト
 *    https://www.peko-step.com/tool/tfcolor.html
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  Script Command - Scene`s -
 * 
 * =============================================================================
 * 
 *  ●Open quest main menu
 *   Ayatam.QUEST.openQuestMenu()
 *   *you need at least one quest assented to be able to open the menu.
 * 
 *   *if you want to open quest menu straight.
 *     SceneManager.push(Scene_QuestMenu)
 *    if you need at least one quest assented to open quest menu then,
 *    use this for true or false.
 *     $gameQuest.canOpenQuestMenu()
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●Open quest board
 *   
 *   quest board will only show the quest that is Available to assent.
 *   Available quests will be 'not assented' and 'not reported'
 *   and not failed(in fail mode) and 'not NPC only'.
 * 
 * -----------------------------------------------------------------------------
 * 
 *   Ayatam.QUEST.openQuestBoard(id,name,list,mode)
 *   id   : quest board id.
 *          set 0 for showing every quest that is Available.
 *   name : quest board name.
 *          use ''(Single quote) and write the name of the board.
 *          if you want to use 'Global Settings' Quest board name
 *          then type null.
 *   list : list id.
 *          0: it will show quests that is Available according to
 *             what you have setup in 'Global Settings' > 
 *             'Quest Requirement Settings' > 'Select Requirements'.
 *          1: it will use leader actor level to show in the list.
 *             id 1 is use to show the player what other recommends
 *             are in the quest in order to assent.
 *             *leader actor level is available to set in the quest it self.
 *          2: this will show all the quests are 'not NPC only'.
 *             similar to id 1 but it dosen`t use leader actor level to show.
 *          *if there is no Requirement setted in the quest then
 *           it will show the quest in the list.
 *   mode : set true/false.
 *          how to response after player select the quest.
 *          true:show requirement window and ask player to assent.
 *          false:ignore requirement window and ask player to assent.
 * 
 *  【example:1】use list mode 1 to show quest board and no rename and
 *               ignore requirement and ask player to assent.
 *               Ayatam.QUEST.openQuestBoard(0,null,1,false)
 * 
 *  【example:2】all the quest that includes board id 1 and
 *               change the quest board name to 'test board' and
 *               show requirement window and ask player to assent.
 *               Ayatam.QUEST.openQuestBoard(1,'test board',0,true)
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  Script Command - quest assenting -
 * 
 * =============================================================================
 * 
 *  ●show requirement window then show quest info
 *   Ayatam.QUEST.showCheckQuest(id,mode)
 *   id   : quest id.
 *          use ''(Single quote) and write quest id.
 *          *quest id will be the list number in 'Quest Database'.
 *   mode : if the quest requirement are ok to assent then response as...
 *          true: ask player to assent
 *          false: let the event take over
 *          *if you omit then it will set false by default.
 * 
 *  【example:1】if the quest you want to get is in 'Quest Database' list
 *               number 1 and show requirement to assent for the quest and 
 *               if it`s assentable then ask player to assent the quest 1.
 *               Ayatam.QUEST.showCheckQuest('quest1',true)
 * 
 *  【example:2】if the quest you want to get is in 'Quest Database' list
 *               number 2 and even it requirement is ok to assent then 
 *               let the event take over.
 *               Ayatam.Quest.showCheckQuest('quest2')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●get player pressed key for 'show requirement window then show quest info'
 *   *auxiliary command for 'show requirement window then show quest info'
 *   Ayatam.QUEST.showCheckChoice()
 * 
 *  【example】this command will only work when
 *             Ayatam.QUEST.showCheckQuest(id,mode)`s
 *             mode is setted to false.
 * 
 *        timing of the player press key response is
 *        when requirement window is opened then it will get
 *        enter/cancel that the player has pressed.
 * 
 *        when enter key : When the conditions are met
 *        when cancel key : Otherwise
 * 
 *   *this command is use for event command 'Flow control'
 *   「Conditional branch」`s script command.
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●ask player to assent the quest.
 *   Ayatam.QUEST.showQuest(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *  【example】if the quest you want to get is in 'Quest Database' list
 *             number 1 then show quest 1 info without asking requirement
 *             and ask player to assent.
 *             Ayatam.QUEST.showQuest('quest1')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●force assent quest
 *   Ayatam.QUEST.forceAssent(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *  【example】if the quest you want to get is in 'Quest Database' list
 *             number 1 then will not show any window and
 *             just assent quest 1.
 *             Ayatam.QUEST.forceAssent('quest1')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●report quest
 *   Ayatam.QUEST.reportQuest(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *  【example】if the quest you want to get is in 'Quest Database' list
 *             number 1 and quest 1`s all objectives is ok to report
 *             then ask the player to report.
 *             Ayatam.QUEST.reportQuest('quest1')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●force report quest
 *   Ayatam.QUEST.forceReportQuest(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *  【example】if the quest you want to get is in 'Quest Database' list
 *             number 1 and all objectives is ok to report
 *             then don`t ask anything and it just report.
 *             Ayatam.QUEST.forceReportQuest('quest1')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●set current quest to failed
 *   Ayatam.QUEST.failQuest(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *  【example】if the quest you want to get is in 'Quest Database' list
 *             number 1 then it will just set the quest to failed.
 *             Ayatam.QUEST.failQuest('quest1')
 *   
 *   *this will only work when quest system is 'fail mode'.
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●reset quests that is been assented
 *   Ayatam.QUEST.resetQuest(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *  【example】if the quest you want to get is in 'Quest Database' list
 *             number 1 and if quest 1 is assented then
 *             it will reset the quest.
 *             Ayatam.QUEST.resetQuest('quest1')
 * 
 *   *when it resets it will use setting for each quests 'deleting info'
 *    for reset as well.
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●for debuging get all quest that is in Quest list
 *   Ayatam.QUEST.getAllQuest()
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●reset all assented quests
 *   Ayatam.QUEST.resetAllQuest()
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  Script Command - quest navigator -
 * 
 * =============================================================================
 * 
 *  ●show navigator
 *   *it will only work when quest is set to navigate.
 *   Ayatam.QUEST.showQuestNavi()
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●hide navigator
 *   *it will only work when quest is set to navigate.
 *   Ayatam.QUEST.hideQuestNavi()
 * 
 *   *!!!attension!!!
 *   when you hide quest navigator from event while quest is set to navigate.
 *   then you must use 'show navigator' when the event is finished in order
 *   to show navigator again.
 *   if you don`t include 'show navigator' with 'hide navigator' then 
 *   it will not look nice after the event is done.
 *   so please use this as set of 'show navigator'.
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●get if any quest set to navigate「Conditional branch」
 *   $gameQuest.questInNavi()
 *   
 *   it will return true when any quest is setted to navigate.
 *   it will return false when there is no quest is set to navigate.
 * 
 *   *this command is use for event command 'Flow control'
 *   「Conditional branch」`s script command.
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  Script Command - Quest Conditions - 「Conditional branch」
 *  *these command below is use for event command 'Flow control'
 *   「Conditional branch」`s script command.
 * 
 * =============================================================================
 * 
 *  ●can quest assent?
 *   $gameQuest.canAssent(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *         it will return true if the quest is assentable.
 *         it will return false if quest can not assent.
 * 
 *  【example】if the quest you want to check if can assent is in
 *             'Quest Database' list number 3.
 *             $gameQuest.canAssent('quest3')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●can quest report?
 *   $gameQuest.canReport(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *         it will return true if the quest is ok to report.
 *         it will return false if quest can not report yet.
 * 
 *  【example】if the quest you want to check for can report in
 *             'Quest Database' list number 3.
 *             $gameQuest.canReport('quest3')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●is quest assented?
 *   $gameQuest.isAssented(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *         it will return true if the quest is assented.
 *         it will return false if the quest is not assented yet.
 * 
 *  【example】if the quest you want to check for assented in
 *             'Quest Database' list number 3.
 *             $gameQuest.isAssented('quest3')
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●is quest reported?
 *   $gameQuest.isReported(id)
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 * 
 *         it will return true if the quest is reported.
 *         it will return false if the quest is not reported yet.
 * 
 *  【example】if the quest you want to check for reported in
 *             'Quest Database' list number 3.
 *             $gameQuest.isReported('quest3')
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  Script Command 「quest_obj」 - quest objectives -
 * 
 * =============================================================================
 * 
 *  ●insert amount to objective present progress
 *   Ayatam.QUEST.insObj(id,setId,amount)
 *   id     : quest id.
 *            use ''(Single quote) and write quest id.
 *            *quest id will be the list number in 'Quest Database'.
 *   setId  : objective set id.
 *            use ''(Single quote) and write quest id.
 *            *objective set id will be the list number in quest 'objective list'.
 *   amount : amount to insert.
 * 
 *  【example】if you want to insert 20 to quest 2`s objective set 1.
 *             Ayatam.QUEST.insObj('quest2','set1',20)
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●add amount to objective present progress
 *   Ayatam.QUEST.addObj(id,setId,amount)
 *   id     : quest id.
 *            use ''(Single quote) and write quest id.
 *            *quest id will be the list number in 'Quest Database'.
 *   setId  : objective set id.
 *            use ''(Single quote) and write quest id.
 *            *objective set id will be the list number in quest 'objective list'.
 *   amount : amount to add.
 * 
 *  【example】if you want to add 5 to quest 3`s objective set 4.
 *             Ayatam.QUEST.addObj('quest3','set4',5)
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●subtract amount from objective present progress
 *   Ayatam.QUEST.subObj(id,setId,amount)
 *   id     : quest id.
 *            use ''(Single quote) and write quest id.
 *            *quest id will be the list number in 'Quest Database'.
 *   setId  : objective set id.
 *            use ''(Single quote) and write quest id.
 *            *objective set id will be the list number in quest 'objective list'.
 *   amount : amount to subtract.
 * 
 *  【example】if you want to subtract 40 from quest 1`s objective set 2.
 *             Ayatam.QUEST.subObj('quest1','set2',40)
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●get objective progress
 *   Ayatam.QUEST.questObj(id,setId)
 *   id     : quest id.
 *            use ''(Single quote) and write quest id.
 *            *quest id will be the list number in 'Quest Database'.
 *   setId  : objective set id.
 *            use ''(Single quote) and write quest id.
 *            *objective set id will be the list number in quest 'objective list'.
 * 
 *  【example】if you want to find out the progress of quest 1`s objective set 2.
 *             Ayatam.QUEST.questObj('quest1','set2')
 * 
 *  【example of use:1】
 *               Ayatam.QUEST.questObj('quest1','set2') >= 4
 *               this mean`s is quest 1`s set 2 progress is above 4?
 *               it will return true/false
 * 
 *   *this command is use for event command 'Flow control'
 *   「Conditional branch」`s script command.
 * 
 *  【example of use:2】
 *               $gameVariables.setValue(1,Ayatam.QUEST.questObj('quest1','set2'))
 *               this means insert quest 1`s set 2 progress amount
 *               to variabale id 1.
 * 
 *   *this command is use for event command 'advanced script command'.
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●change objective complete progress amount
 *   Ayatam.QUEST.objChangeClearAmount(id,setId,amount)
 *   id     : quest id.
 *            use ''(Single quote) and write quest id.
 *            *quest id will be the list number in 'Quest Database'.
 *   setId  : objective set id.
 *            use ''(Single quote) and write quest id.
 *            *objective set id will be the list number in quest 'objective list'.
 *   amount : amount to insert new complete progress amount.
 * 
 *  【example】if you want to change quest 3`s objective set 2
 *             complete progress amount to 10.
 *             Ayatam.QUEST.objChangeClearAmount('quest3','set2',10)
 * 
 * =============================================================================
 * 
 * =============================================================================
 * 
 *  Script Command - quest map icons -
 * 
 * =============================================================================
 * 
 *  ●show quest icon on event 「Annotation」
 *  「implement this in the first line of event page」
 *   <quest: id, x, y>
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 *   x  :  adjust value of x coordinate.
 *   y  :  adjust value of y coordinate.
 * 
 *   *this will show 'quest icon' that you have setup in 'quest database'
 *    if the current quest is assentable.
 *    it will disappear when the quest is assented.
 *    then it will change to 'Quest Report Icon' that you have setup in
 *    'Global Settings' when it is available to report.
 * 
 *  【example of use:1】<quest: quest1, 0, 0>
 *                      this mean`s it will show 'quest icon' of quest 1
 *                      when the quest 1 is available to assent.
 *                      and no adjustment coordinate to x and y.
 * 
 *  【example of use:2】<quest: quest1, -10, -10>
 *                      this mean`s it will show 'quest icon' of quest 1
 *                      when the quest 1 is available to assent.
 *                      and adjustment coordinate to x -10 and y -10.
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●show quest icon on event 「Annotation」
 *  「implement this in the first line of event page」
 *   <questStay: id, x, y>
 *   id : quest id.
 *        use ''(Single quote) and write quest id.
 *        *quest id will be the list number in 'Quest Database'.
 *   x  :  adjust value of x coordinate.
 *   y  :  adjust value of y coordinate.
 * 
 *   *this will show 'quest icon' that you have setup in 'quest database'
 *    if the current quest is assentable and in progress.
 *    it will keep appearing when the quest is assented.
 *    then it will change to 'Quest Report Icon' that you have setup in
 *    'Global Settings' when it is available to report.
 * 
 *  【example of use:1】<questStay: quest1, 0, 0>
 *                      this mean`s it will show 'quest icon' of quest 1
 *                      when the quest 1 is available to assent and in progress.
 *                      and no adjustment coordinate to x and y.
 * 
 *  【example of use:2】<questStay: quest1, -10, -10>
 *                      this mean`s it will show 'quest icon' of quest 1
 *                      when the quest 1 is available to assent and in progress.
 *                      and adjustment coordinate to x -10 and y -10.
 * 
 * -----------------------------------------------------------------------------
 * 
 *  ●show objective active icon on event 「Annotation」
 *  「implement this in the first line of event page」
 *   <questObj: id, setId, x, y>
 *   id     : quest id.
 *            use ''(Single quote) and write quest id.
 *            *quest id will be the list number in 'Quest Database'.
 *   setId  : objective set id.
 *            use ''(Single quote) and write quest id.
 *            *objective set id will be the list number in quest 'objective list'.
 *   x      : adjust value of x coordinate.
 *   y      : adjust value of y coordinate.
 * 
 *   *this will show 'Objective Active Icon' that you have setup in 'Global Settings' when 
 *    player has assented the current quest and the set objective is activated.
 * 
 *  【example of use:1】<questObj: quest1, set1, 0, 0>
 *                      this mean`s it will show 'Objective Active Icon' of quest 1`s 
 *                      objective set 1 is activated.
 *                      and no adjustment coordinate to x and y.
 * 
 *  【example of use:2】<questObj: quest1, set1, +10, -20>
 *                      this mean`s it will show 'Objective Active Icon' of quest 1`s 
 *                      objective set 1 is activated.
 *                      and adjustment coordinate to x +10 and y -20.
 * 
 *   *when the current quest is set to 'root quest' then the
 *    objectives will be activated one by one.
 * 
 * =============================================================================
 *
 * @param GlobalSettings
 * @text Global Settings
 * @type struct<QuestGlobalSettings>
 * @default {"Setup":"","FailingQuestMode":"false","NoNaviQuestMode":"false","MenuCommandInformation":"{\"AddToMenuCommand\":\"true\",\"QuestMenuCommandName\":\"Quest\"}","FontSetup":"{\"FontName\":\"\",\"FontSize\":\"16\"}","ShowQuestLevelUp":"false","QuestMenuConditionCategory":"{\"CategoryIconAll\":\"187\",\"CategoryNameAll\":\"All\",\"CategoryIconActive\":\"189\",\"CategoryNameActive\":\"Active\",\"CategoryIconCleared\":\"191\",\"CategoryNameCleared\":\"Reported\",\"CategoryIconFailed\":\"194\",\"CategoryNameFailed\":\"Failed\"}","QuestMenuQuestCategory":"{\"CategoryID\":\"[\\\"cat0\\\",\\\"cat1\\\",\\\"cat2\\\",\\\"cat3\\\"]\",\"CategoryName\":\"[\\\"All\\\",\\\"Talk\\\",\\\"Gather\\\",\\\"Fight\\\"]\"}","QuestFlags":"[\"StoryQuest\",\"TalkQuest\",\"GatherQuest\",\"FightQuest\"]","QuestAssentCommand":"[\"Assent\",\"Cancel\"]","QuestCancelCommand":"[\"Delete\",\"Cancel\"]","QuestReportCommand":"[\"Report\",\"Cancel\"]","QuestActiveFlag":"193","QuestClearFlag":"79","BoardSetup":"","QuestBoardName":"Quest Board","QuestBoardListLabels":"[\"Quest\",\"Category\",\"Difficulty\"]","QuestNeededConditionSetup":"","QuestSelectRequirement":"{\"UseActorLevel\":\"true\",\"UseNeededMember\":\"true\",\"UseOutedMember\":\"true\",\"UseMaxMember\":\"true\",\"UseSw\":\"true\",\"UseVal\":\"true\",\"UseQuestAssented\":\"true\",\"UseQuestReported\":\"true\"}","QuestNeededLabel":"Requirements","QuestNoneNeededLabel":"No matter","QuestNeededListMark":"・","QuestNeededLvlLabel":"[\"Level Requirement\",\"Lv.\"]","QuestNeededMaxMemberLabel":"Max Mamber","QuestNeededInMemberLabel":"Required Member","QuestNeededOutMemberLabel":"Exclude Member","QuestNeededMustAssentLabel":"Assented Require","QuestNeededMustClearLabel":"Reported Require","QuestNeededNotAvailableLabel":"Requirements are not met.","QuestMenuSetup":"","QuestMenuHelp":"\"←→:Category / ↑↓:Select / QW(LB/RB):ChangePage / D(RT):Filtering / A(LT):SetNavi / S(back):Delete\"","QuestMenuFilterKey":"D","QuestMenuPadFilterKey":"rt","QuestMenuNaviKey":"A","QuestMenuPadNaviKey":"lt","QuestMenuCancelKey":"S","QuestMenuPadCancelKey":"back","QuestConditionIcons":"[\"193\",\"191\",\"194\"]","QuestNaviCommandName":"[\"SetNavi\",\"UnsetNavi\",\"Cancel\"]","QuestDataSetup":"","QuestDataPageKey":"{\"PageUpKey\":\"pageup\",\"PageDownKey\":\"pagedown\",\"PageChangeSound\":\"Book2\"}","QuestDataPageUpLabel":"{\"PageUpIcon\":\"187\",\"PageUpKeyLabel\":\":Q(LB)\"}","QuestDataPageDownLabel":"{\"PageDownIcon\":\"189\",\"PageDownKeyLabel\":\"W(RB):\"}","QuestDataDifficultySetup":"{\"IconPacks\":\"[\\\"5,5,5,5,5\\\",\\\"4,4,4,4\\\",\\\"3,3,3\\\",\\\"2,2\\\",\\\"1\\\"]\",\"TextColor\":\"18\"}","QuestDataInfoLabel":"[\"Info\",\"Objectives\"]","QuestDataClientLabel":"Client","QuestDataLocationLabel":"{\"LocationLabelName\":\"Client Location\",\"LocationLabelIcon\":\"190\"}","QuestDataQuestAreaLabel":"{\"LocationLabelName\":\"Activity Location\",\"LocationLabelIcon\":\"190\"}","QuestDataContentLabel":"Summary","QuestDataRewardLabel":"{\"RewardLabelName\":\"Rewards\",\"RewardExpIcon\":\"77\",\"RewardExpUnit\":\"EXP\",\"RewardGoldIcon\":\"313\",\"RewardGoldUnit\":\"G\"}","QuestNaviSetup":"","QuestNaviMapSceneKey":"{\"UseMapKey\":\"true\",\"MapSceneKey\":\"D\",\"MapScenePadKey\":\"rt\"}","QuestOtherSounds":"","QuestAssentedSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Book2\"}","QuestGetSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Item1\"}","QuestLostSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Miss\"}","QuestObjClearSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Item\"}","QuestReportSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Victory1\"}","QuestFailedSoundData":"{\"UseQuestSound\":\"true\",\"QuestSound\":\"Gag3\"}"}
 * @desc Setup Global Settings of quest system.
 * 
 * @param CustamizeSettings
 * @text Customize Settings
 * @type struct<QuestCustamizeSettings>
 * @default {"DefaultDesigns":"","WindowSets":"{\"UseAll\":\"true\",\"UseBoard\":\"true\",\"UseNeeded\":\"true\",\"UseData\":\"true\"}","BoardSet":"{\"Set1\":\"33\",\"Set2\":\"35\",\"Set3\":\"14\",\"Set4\":\"49\",\"Set5\":\"80\"}","NeededSet":"{\"Set1\":\"33\",\"Set2\":\"34\",\"Set3\":\"70\",\"Set4\":\"0\",\"Set5\":\"110\",\"Set6\":\"170\",\"Set7\":\"190\",\"Set8\":\"110\",\"Set9\":\"190\",\"Set10\":\"0\",\"Set11\":\"38\",\"Set12\":\"170\",\"Set13\":\"0\",\"Set14\":\"38\",\"Set15\":\"190\",\"Set16\":\"33\",\"Set17\":\"34\",\"Set18\":\"70\",\"Set19\":\"-40\"}","DataSet":"{\"Set1\":\"33\",\"Set2\":\"34\",\"Set3\":\"70\",\"Set4\":\"71\",\"Set5\":\"34\",\"Set6\":\"105\",\"Set7\":\"76\",\"Set8\":\"139\",\"Set9\":\"144\",\"Set10\":\"230\",\"Set11\":\"139\",\"Set12\":\"240\",\"Set13\":\"180\",\"Set14\":\"182\",\"Set15\":\"34\",\"Set16\":\"279\",\"Set17\":\"281\",\"Set18\":\"34\",\"Set19\":\"142\"}","TextColors":"","HeadingColor":"#99ccff","DealOkColor":"#00e060","DealNoColor":"#ff2020","NaviColor":"#83ff83","AreaColor":"#83ff83","ExpGoldColor":"#84a9ff","BoardWindowSetup":"","BoardWindow":"{\"MainX\":\"45\",\"MainY\":\"28\",\"MainWidth\":\"726\",\"MainHeight\":\"556\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"255\",\"ListX\":\"60\",\"ListY\":\"120\",\"ListWidth\":\"696\",\"ListHeight\":\"422\",\"ListOpacity\":\"0\",\"ListBackOpacity\":\"0\",\"BoardBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","BoardData":"{\"titleX\":\"0\",\"titleY\":\"0\",\"titleFontSize\":\"26\",\"allLabelY\":\"10\",\"questNameX\":\"90\",\"questCategoryX\":\"280\",\"questDifficultyX\":\"190\",\"listNameX\":\"0\",\"listCategoryX\":\"0\",\"listDifficultyX\":\"0\"}","MustWindowSetup":"","MustWindow":"{\"MainX\":\"0\",\"MainY\":\"72\",\"MainWidth\":\"408\",\"MainHeight\":\"468\",\"MainOpacity\":\"255\",\"MainBackOpacity\":\"192\",\"SubX\":\"408\",\"SubY\":\"72\",\"SubWidth\":\"408\",\"SubHeight\":\"468\",\"SubOpacity\":\"255\",\"SubBackOpacity\":\"192\",\"MustBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","MustData":"{\"flagX\":\"0\",\"flagY\":\"0\",\"flagFontSize\":\"14\",\"questNameX\":\"0\",\"questNameY\":\"0\",\"questNameFontSize\":\"26\",\"questDifficultyX\":\"0\",\"questDifficultyY\":\"0\",\"maxMemberX\":\"0\",\"maxMemberY\":\"0\",\"actorLevelX\":\"0\",\"actorLevelY\":\"0\",\"actorLevelNumberX\":\"0\",\"actorLevelNumberY\":\"0\",\"actorNeedX\":\"0\",\"actorNeedY\":\"230\",\"actorOutX\":\"190\",\"actorOutY\":\"230\",\"subPageTitleX\":\"0\",\"subPageTitleY\":\"0\",\"subPageTitleFontSize\":\"14\",\"subPageAreaX\":\"0\",\"subPageAreaY\":\"0\",\"subPageSwX\":\"0\",\"subPageSwY\":\"0\",\"subPageValX\":\"0\",\"subPageValY\":\"0\",\"subPageAssentedX\":\"0\",\"subPageAssentedY\":\"0\",\"subPageReportedX\":\"0\",\"subPageReportedY\":\"0\",\"subPageDetailX\":\"0\",\"subPageDetailY\":\"380\"}","DataWindowSetup":"","DataWindow":"{\"DataX\":\"164\",\"DataY\":\"28\",\"DataWidth\":\"488\",\"DataHeight\":\"568\",\"DataOpacity\":\"255\",\"DataBackOpacity\":\"192\",\"DataBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","QuestDatas":"{\"flagX\":\"0\",\"flagY\":\"0\",\"flagFontSize\":\"26\",\"DifficultyX\":\"0\",\"DifficultyY\":\"0\",\"DifficultyIconX\":\"0\",\"DifficultyIconY\":\"0\",\"DifficultyIconW\":\"-26\",\"QuestNameX\":\"0\",\"QuestNameY\":\"0\",\"QuestNameFontSize\":\"26\",\"PageLabelX\":\"0\",\"PageLabelY\":\"0\",\"PageLabelPageX\":\"0\",\"PageLabelPageY\":\"0\",\"PageUpKeyX\":\"0\",\"PageUpKeyY\":\"0\",\"PageUpKeyIconY\":\"0\",\"PageDownKeyX\":\"0\",\"PageDownKeyY\":\"0\",\"PageDownKeyIconY\":\"0\",\"LocationLabelX\":\"29\",\"LocationLabelY\":\"0\",\"LocationX\":\"0\",\"LocationY\":\"0\",\"ClientLabelX\":\"0\",\"ClientLabelY\":\"0\",\"ClientX\":\"0\",\"ClientY\":\"0\",\"ContentLabelX\":\"0\",\"ContentLabelY\":\"0\",\"ContentX\":\"0\",\"ContentY\":\"0\",\"RewardLabelX\":\"0\",\"RewardLabelY\":\"0\",\"RewardExpX\":\"0\",\"RewardExpY\":\"0\",\"RewardGoldX\":\"0\",\"RewardGoldY\":\"0\",\"RewardItemX\":\"0\",\"RewardItemY\":\"0\",\"RewardItemDrawMode\":\"true\",\"RewardItemSecondX\":\"220\"}","NavWindowSetup":"","NavWindow":"{\"NavX\":\"408\",\"NavY\":\"0\",\"NavWidth\":\"408\",\"NavHeight\":\"624\",\"NavOpacity\":\"0\",\"NavBackOpacity\":\"0\",\"NavBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","NavData":"{\"QuestNameX\":\"0\",\"QuestNameY\":\"0\",\"AreaLabelX\":\"0\",\"AreaLabelY\":\"0\",\"AreaX\":\"0\",\"AreaY\":\"0\",\"ObjectiveX\":\"0\",\"ObjectiveY\":\"0\"}","QuestMenuSetup":"","MenuWindow":"{\"HelpWindowX\":\"0\",\"HelpWindowY\":\"566\",\"HelpWindowWidth\":\"816\",\"HelpWindowHeight\":\"58\",\"HelpWindowOpacity\":\"255\",\"HelpWindowBackOpacity\":\"192\",\"IconCategoryX\":\"0\",\"IconCategoryY\":\"0\",\"IconCategoryWidth\":\"326.4\",\"IconCategoryHeight\":\"102\",\"IconCategoryOpacity\":\"255\",\"IconCategoryBackOpacity\":\"192\",\"IconCategoryLabelX\":\"53.2\",\"IconCategoryLabelY\":\"36\",\"IconCategoryLabelWidth\":\"220\",\"IconCategoryLabelHeight\":\"78\",\"IconCategoryLabelOpacity\":\"0\",\"IconCategoryLabelBackOpacity\":\"0\",\"QuestListX\":\"0\",\"QuestListY\":\"102\",\"QuestListWidth\":\"326.4\",\"QuestListHeight\":\"464\",\"QuestListOpacity\":\"255\",\"QuestListBackOpacity\":\"192\",\"QuestDataX\":\"327.4\",\"QuestDataY\":\"0\",\"QuestDataWidth\":\"488\",\"QuestDataHeight\":\"566\",\"QuestDataOpacity\":\"255\",\"QuestDataBackOpacity\":\"192\",\"QuestMenuImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}","AllCommandSetup":"","MenuCommand":"{\"AssentingX\":\"288\",\"AssentingY\":\"258\",\"AssentingOpacity\":\"255\",\"AssentingBackOpacity\":\"255\",\"AssentingBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\",\"ReportingX\":\"288\",\"ReportingY\":\"258\",\"ReportingOpacity\":\"255\",\"ReportingBackOpacity\":\"255\",\"ReportingBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\",\"FilterX\":\"288\",\"FilterY\":\"204\",\"FilterOpacity\":\"255\",\"FilterBackOpacity\":\"255\",\"FilterBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\",\"NavCommandX\":\"288\",\"NavCommandY\":\"258\",\"NavCommandOpacity\":\"255\",\"NavCommandBackOpacity\":\"255\",\"NavCommandBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\",\"CancelingX\":\"288\",\"CancelingY\":\"258\",\"CancelingOpacity\":\"255\",\"CancelingBackOpacity\":\"255\",\"CancelingBackImg\":\"{\\\"UsePicture\\\":\\\"false\\\",\\\"PictureFile\\\":\\\"\\\",\\\"PictureX\\\":\\\"0\\\",\\\"PictureY\\\":\\\"0\\\",\\\"PictureOpacity\\\":\\\"255\\\",\\\"PictureAnchor\\\":\\\"false\\\"}\"}"}
 * @desc Customize window coordinate and data coordinate of the windows. can add background imgs.
 * 
 * @param QuestDatabase
 * @text Quest Database
 * @type struct<QuestDatabase>[]
 * @default ["{\"QuestInfo\":\"\",\"QuestName\":\"Ester`s Call\",\"QuestFlagID\":\"0\",\"RootQuest\":\"false\",\"QuestIconSetting\":\"{\\\"QuestIconID\\\":\\\"2\\\",\\\"QuestIconX\\\":\\\"0\\\",\\\"QuestIconY\\\":\\\"0\\\"}\",\"QuestBoardID\":\"[\\\"0\\\"]\",\"NpcOnly\":\"false\",\"QuestCategory\":\"[\\\"cat2\\\"]\",\"QuestDifficulty\":\"{\\\"DifficultyText\\\":\\\"\\\",\\\"TextX\\\":\\\"0\\\",\\\"TextY\\\":\\\"0\\\",\\\"IconsetID\\\":\\\"0\\\"}\",\"QuestClient\":\"{\\\"QuestClientName\\\":\\\"Ester\\\",\\\"QuestLocation\\\":\\\"Galshia Empire\\\",\\\"QuestClientSprite\\\":\\\"{\\\\\\\"SpriteName\\\\\\\":\\\\\\\"Actor1\\\\\\\",\\\\\\\"SpriteIndex\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SpriteX\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"SpriteY\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"QuestClientPicture\\\":\\\"{\\\\\\\"UsePicture\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"PictureFile\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"PictureX\\\\\\\":\\\\\\\"220\\\\\\\",\\\\\\\"PictureY\\\\\\\":\\\\\\\"200\\\\\\\",\\\\\\\"PictureOpacity\\\\\\\":\\\\\\\"255\\\\\\\",\\\\\\\"PictureAnchor\\\\\\\":\\\\\\\"false\\\\\\\"}\\\"}\",\"DailyQuest\":\"true\",\"AutoReport\":\"false\",\"QuestActivateSetup\":\"\",\"QuestCancelSetup\":\"{\\\"CancelLock\\\":\\\"false\\\",\\\"CancelSelfSw\\\":\\\"\\\",\\\"CancelSw\\\":\\\"\\\",\\\"CancelVal\\\":\\\"\\\"}\",\"QuestClearedSetup\":\"{\\\"ClearedSelfSw\\\":\\\"\\\",\\\"ClearedSw\\\":\\\"\\\",\\\"ClearedVal\\\":\\\"\\\",\\\"ClearedCommonEvent\\\":\\\"2\\\"}\",\"QuestFailedSetup\":\"{\\\"FailedSelfSw\\\":\\\"\\\",\\\"FailedSw\\\":\\\"\\\",\\\"FailedVal\\\":\\\"\\\",\\\"FailedCommonEvent\\\":\\\"1\\\"}\",\"QuestOrderConditions\":\"\",\"ActorLevel\":\"[\\\"{\\\\\\\"Actor\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"ActorLevel\\\\\\\":\\\\\\\"3\\\\\\\"}\\\",\\\"{\\\\\\\"Actor\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"ActorLevel\\\\\\\":\\\\\\\"42\\\\\\\"}\\\",\\\"{\\\\\\\"Actor\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"ActorLevel\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"Actor\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"ActorLevel\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"NeedMembers\":\"[\\\"3\\\",\\\"1\\\",\\\"4\\\"]\",\"OutMembers\":\"[\\\"2\\\"]\",\"MaxMember\":\"0\",\"SwitchConditions\":\"[\\\"{\\\\\\\"SwID\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"SwBoolean\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"SwID\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"SwBoolean\\\\\\\":\\\\\\\"false\\\\\\\"}\\\"]\",\"ValConditions\":\"[\\\"{\\\\\\\"Val\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"ValCondition\\\\\\\":\\\\\\\"just\\\\\\\",\\\\\\\"ValValue\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"Val\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"ValCondition\\\\\\\":\\\\\\\"lt\\\\\\\",\\\\\\\"ValValue\\\\\\\":\\\\\\\"50\\\\\\\"}\\\"]\",\"NeedAssentedQuests\":\"[]\",\"NeedClearedQuests\":\"[]\",\"QuestInfos\":\"\",\"PlaceInformation\":\"Farm Plant\",\"QuestContent\":\"\\\"There is too many monster near by\\\\nthe Farm Plant. Please help us.\\\"\",\"QuestClearContent\":\"\",\"QuestObjectiveSettings\":\"[\\\"{\\\\\\\"ObjectiveIcons\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"ObjectiveActivatedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"67\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveClearedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"72\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveFailedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveTypes\\\\\\\":\\\\\\\"questobj\\\\\\\",\\\\\\\"ObjectiveID\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"TargetEnemyID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetValID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetItemID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetQuestID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveContent\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Talk to Ester in Galshia Empire\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ObjectiveFinishAmount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"ClearCommonEvent\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"{\\\\\\\"ObjectiveIcons\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"ObjectiveActivatedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"67\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveClearedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"72\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveFailedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveTypes\\\\\\\":\\\\\\\"killquest\\\\\\\",\\\\\\\"ObjectiveID\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"TargetEnemyID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetValID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetItemID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetQuestID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveContent\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Kill Bat`s near by Farm Plant\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ObjectiveFinishAmount\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"ClearCommonEvent\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"{\\\\\\\"ObjectiveIcons\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"ObjectiveActivatedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"67\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveClearedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"72\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ObjectiveFailedIcon\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveTypes\\\\\\\":\\\\\\\"itemquest\\\\\\\",\\\\\\\"ObjectiveID\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"TargetEnemyID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetValID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetItemID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"UseWitchItem\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"SelectedItem\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"SelectedWeapon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"SelectedArmor\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"TargetQuestID\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"ObjectiveContent\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"Get 5 potions\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ObjectiveFinishAmount\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"ClearCommonEvent\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\",\"QuestRewards\":\"\",\"QuestRewardGold\":\"5000\",\"QuestLoseGold\":\"0\",\"QuestRewardExp\":\"400\",\"QuestLoseExp\":\"0\",\"QuestRewardItem\":\"[\\\"{\\\\\\\"UseWitchItem\\\\\\\":\\\\\\\"Weapon\\\\\\\",\\\\\\\"SelectedItem\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SelectedWeapon\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"SelectedArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Amount\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"{\\\\\\\"UseWitchItem\\\\\\\":\\\\\\\"Armor\\\\\\\",\\\\\\\"SelectedItem\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SelectedWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SelectedArmor\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"UseWitchItem\\\\\\\":\\\\\\\"Item\\\\\\\",\\\\\\\"SelectedItem\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"SelectedWeapon\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"SelectedArmor\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Amount\\\\\\\":\\\\\\\"10\\\\\\\"}\\\"]\",\"QuestLoseItem\":\"\"}"]
 * @desc Create/edit/delete Quests. list number will be quest id.【example】quest1,quest2...etc
 */

//=============================================================================
//  【QuestGlobalSettings】
//=============================================================================

/*~struct~QuestGlobalSettings:
 * @param Setup
 * @text Initial Settings
 * 
 * @param BoardSetup
 * @text Quest Board Settings
 * 
 * @param QuestNeededConditionSetup
 * @text Quest Requirement Settings
 * 
 * @param QuestMenuSetup
 * @text Quest Menu Settings
 * 
 * @param QuestDataSetup
 * @text Quest Info Settings
 * 
 * @param QuestNaviSetup
 * @text Quest Navigator Settings
 * 
 * @param QuestOtherSounds
 * @text Sound Settings
 * 
 * @param FailingQuestMode
 * @text Quest Failing Mode
 * @parent Setup
 * @type boolean
 * @on Use Failing mode
 * @off Normal mode
 * @default false
 * @desc When default it dosn`t have failing function. you can activate failing function with this setup.
 * 
 * @param NoNaviQuestMode
 * @text Quest Navigator Mode
 * @parent Setup
 * @type boolean
 * @on disable Navigator
 * @off enable Navigator
 * @default false
 * @desc When default navigator is enabled but you can disable if you don`t want to use quest navigator.
 * 
 * @param MenuCommandInformation
 * @text Add Quest Command to Menu
 * @parent Setup
 * @type struct<QuestMenuCommandInfomation>
 * @desc Setup quest command to add in the menu commands.
 * 
 * @param FontSetup
 * @text Font Settings
 * @parent Setup
 * @type struct<FontInfomation>
 * @desc Setup font for quest system. if you want to use font from default then don`t set the font face name.
 * 
 * @param ShowQuestLevelUp
 * @text Show Level Up
 * @parent Setup
 * @type boolean
 * @on Show
 * @off Don`t Show
 * @default true
 * @desc Setup level up by quest system when actor has leveled up.
 * 
 * @param QuestMenuConditionCategory
 * @text Quest Menu Condition Category
 * @parent Setup
 * @type struct<QuestMenuConditionCategorySetup>
 * @desc Setup for quest menu condition category.【example】All、Active、Reported、Failed(when failing mode)
 * 
 * @param QuestMenuQuestCategory
 * @text Quest Menu Filter Category
 * @parent Setup
 * @type struct<QuestMenuQuestCategorySetup>
 * @desc Setup for quest menu filter category【example】All、Talk、Gather、Fight. link id index with the name index.
 * 
 * @param QuestFlags
 * @text Quest Flag Settings
 * @parent Setup
 * @type string[]
 * @default ["StoryQuest","TalkQuest","GatherQuest","FightQuest"]
 * @desc This is used in Quest Info Window. it references seting from quest it self. ID will be 0、1、2...etc Not list numbers.
 * 
 * @param QuestAssentCommand
 * @text Assenting Command Settings
 * @parent Setup
 * @type string[]
 * @default ["Assent","Cancel"]
 * @desc Setup name for asseting commad. 1 is for assenting 2 is for canceling.
 * 
 * @param QuestCancelCommand
 * @text Delete Command Settings
 * @parent Setup
 * @type string[]
 * @default ["Delete","Cancel"]
 * @desc Setup name for deleting command. 1 is for deleting 2 is for canceling.
 * 
 * @param QuestReportCommand
 * @text Report Command Settings
 * @parent Setup
 * @type string[]
 * @default ["Report","Cancel"]
 * @desc Setup name for Reporting command. 1 is for reporting 2 is for canceling.
 * 
 * @param QuestActiveFlag
 * @text Objective Active Icon
 * @parent Setup
 * @type number
 * @default 193
 * @desc Setup icon index for objective active icon. you can open icon list from text tab then right click.
 * 
 * @param QuestClearFlag
 * @text Quest Report Icon
 * @parent Setup
 * @type number
 * @default 79
 * @desc Setup icon index for quest is able to report. you can open icon list from text tab then right click.
 * 
 * @param QuestBoardName
 * @text Quest Board Name
 * @parent BoardSetup
 * @type string
 * @default Quest Board
 * @desc Setup quest board`s default name.
 * 
 * @param QuestBoardListLabels
 * @text Quest List Label Settings
 * @parent BoardSetup
 * @type string[]
 * @default ["Quest","Category","Difficulty"]
 * @desc This wil use in quest board window. 1 is for quest name 2 is for category 3 is for difficulty.
 * 
 * @param QuestSelectRequirement
 * @text Select Requirements
 * @parent QuestNeededConditionSetup
 * @type struct<QuestRequirementSetups>
 * @default {"UseActorLevel":"true","UseNeededMember":"true","UseOutedMember":"true","UseMaxMember":"true","UseSw":"true","UseVal":"true","UseQuestAssented":"true","UseQuestReported":"true"}
 * @desc Setup witch to use for assenting requirement. if you set to false then it show only the info, not use for requirement.
 * 
 * @param QuestNeededLabel
 * @text Requirement Label
 * @parent QuestNeededConditionSetup
 * @type string
 * @default Requirements
 * @desc This is used in requirement window.
 * 
 * @param QuestNoneNeededLabel
 * @text Requirement Ok Label
 * @parent QuestNeededConditionSetup
 * @type string
 * @default No matter
 * @desc This is used in requirement window, and quest current requirement is not setted.
 * 
 * @param QuestNeededListMark
 * @text Requirement List Mark
 * @parent QuestNeededConditionSetup
 * @type string
 * @default ・
 * @desc This is used for the second page of requirement window.
 * 
 * @param QuestNeededLvlLabel
 * @text Level Requirement Label
 * @parent QuestNeededConditionSetup
 * @type string[]
 * @default ["Level Requirement","Lv."]
 * @desc This is used for requirement window. 1 is for level heading 2 is for level label 【example】「Lv.3」.
 * 
 * @param QuestNeededMaxMemberLabel
 * @text Max Mamber Label
 * @parent QuestNeededConditionSetup
 * @type string
 * @default Max Mamber
 * @desc This is used for requirement window.
 * 
 * @param QuestNeededInMemberLabel
 * @text Required Member Label
 * @parent QuestNeededConditionSetup
 * @type string
 * @default Required Member
 * @desc This is used for requirement window.
 * 
 * @param QuestNeededOutMemberLabel
 * @text Exclude Member Label
 * @parent QuestNeededConditionSetup
 * @type string
 * @default Exclude Member
 * @desc This is used for requirement window.
 * 
 * @param QuestNeededMustAssentLabel
 * @text Assent Required Quest Label
 * @parent QuestNeededConditionSetup
 * @type string
 * @default Assented Require
 * @desc This is used for the second page of requirement window.
 * 
 * @param QuestNeededMustClearLabel
 * @text Report Required Quest Label
 * @parent QuestNeededConditionSetup
 * @type string
 * @default Reported Require
 * @desc This is used for the second page of requirement window.
 * 
 * @param QuestNeededNotAvailableLabel
 * @text Does Not Meet the Requirement Label
 * @parent QuestNeededConditionSetup
 * @type string
 * @default Requirements are not met.
 * @desc This is used for the second page of requirement window.
 * 
 * @param QuestMenuHelp
 * @text Quest Menu Scene Help Description
 * @parent QuestMenuSetup
 * @type string
 * @default "←→:Category / ↑↓:Select / QW(LB/RB):ChangePage / D(RT):Filtering / A(LT):SetNavi / S(back):Delete"
 * @desc This will be used in Quest Menu`s help description.
 * 
 * @param QuestMenuFilterKey
 * @text Setup Filter Key
 * @parent QuestMenuSetup
 * @type select
 * @option A Key
 * @value A
 * @option B Key
 * @value B
 * @option C Key
 * @value C
 * @option D Key
 * @value D
 * @option E Key
 * @value E
 * @option F Key
 * @value F
 * @option G Key
 * @value G
 * @option H Key
 * @value H
 * @option I Key
 * @value I
 * @option J Key
 * @value J
 * @option K Key
 * @value K
 * @option L Key
 * @value L
 * @option M Key
 * @value M
 * @option N Key
 * @value N
 * @option O Key
 * @value O
 * @option P Key
 * @value P
 * @option Q Key
 * @value pageup
 * @option R Key
 * @value R
 * @option S Key
 * @value S
 * @option T Key
 * @value T
 * @option U Key
 * @value U
 * @option V Key
 * @value V
 * @option W Key
 * @value pagedown
 * @option Y Key
 * @value Y
 * @default D
 * @desc Set key for Filtering key in quest menu.
 * 
 * @param QuestMenuPadFilterKey
 * @text [Pad]Setup Filter Key
 * @parent QuestMenuSetup
 * @type select
 * @option A
 * @value ok
 * @option B
 * @value cancel
 * @option X
 * @value shift
 * @option Y
 * @value menu
 * @option LB
 * @value pageup
 * @option RB
 * @value pagedown
 * @option LT
 * @value lt
 * @option RT
 * @value rt
 * @option back
 * @value back
 * @option start
 * @value start
 * @option L3
 * @value l3
 * @option R3
 * @value r3
 * @option cross key up
 * @value up
 * @option cross key down
 * @value down
 * @option cross key left
 * @value left
 * @option cross key right
 * @value right
 * @default rt
 * @desc Set game pad key for Filtering key in quest menu.
 * 
 * @param QuestMenuNaviKey
 * @text Setup SetNavi Key
 * @parent QuestMenuSetup
 * @type select
 * @option A Key
 * @value A
 * @option B Key
 * @value B
 * @option C Key
 * @value C
 * @option D Key
 * @value D
 * @option E Key
 * @value E
 * @option F Key
 * @value F
 * @option G Key
 * @value G
 * @option H Key
 * @value H
 * @option I Key
 * @value I
 * @option J Key
 * @value J
 * @option K Key
 * @value K
 * @option L Key
 * @value L
 * @option M Key
 * @value M
 * @option N Key
 * @value N
 * @option O Key
 * @value O
 * @option P Key
 * @value P
 * @option Q Key
 * @value pageup
 * @option R Key
 * @value R
 * @option S Key
 * @value S
 * @option T Key
 * @value T
 * @option U Key
 * @value U
 * @option V Key
 * @value V
 * @option W Key
 * @value pagedown
 * @option Y Key
 * @value Y
 * @default A
 * @desc Set key for SetNavi key in quest menu.
 * 
 * @param QuestMenuPadNaviKey
 * @text [Pad]Setup SetNavi Key
 * @parent QuestMenuSetup
 * @type select
 * @option A
 * @value ok
 * @option B
 * @value cancel
 * @option X
 * @value shift
 * @option Y
 * @value menu
 * @option LB
 * @value pageup
 * @option RB
 * @value pagedown
 * @option LT
 * @value lt
 * @option RT
 * @value rt
 * @option back
 * @value back
 * @option start
 * @value start
 * @option L3
 * @value l3
 * @option R3
 * @value r3
 * @option cross key up
 * @value up
 * @option cross key down
 * @value down
 * @option cross key left
 * @value left
 * @option cross key right
 * @value right
 * @default lt
 * @desc Set game pad key for SetNavi key in quest menu.
 * 
 * @param QuestMenuCancelKey
 * @text Setup Delete Key
 * @parent QuestMenuSetup
 * @type select
 * @option A Key
 * @value A
 * @option B Key
 * @value B
 * @option C Key
 * @value C
 * @option D Key
 * @value D
 * @option E Key
 * @value E
 * @option F Key
 * @value F
 * @option G Key
 * @value G
 * @option H Key
 * @value H
 * @option I Key
 * @value I
 * @option J Key
 * @value J
 * @option K Key
 * @value K
 * @option L Key
 * @value L
 * @option M Key
 * @value M
 * @option N Key
 * @value N
 * @option O Key
 * @value O
 * @option P Key
 * @value P
 * @option Q Key
 * @value pageup
 * @option R Key
 * @value R
 * @option S Key
 * @value S
 * @option T Key
 * @value T
 * @option U Key
 * @value U
 * @option V Key
 * @value V
 * @option W Key
 * @value pagedown
 * @option Y Key
 * @value Y
 * @default S
 * @desc Set key for Delete key in quest menu.
 * 
 * @param QuestMenuPadCancelKey
 * @text [Pad]Setup Delete Key
 * @parent QuestMenuSetup
 * @type select
 * @option A
 * @value ok
 * @option B
 * @value cancel
 * @option X
 * @value shift
 * @option Y
 * @value menu
 * @option LB
 * @value pageup
 * @option RB
 * @value pagedown
 * @option LT
 * @value lt
 * @option RT
 * @value rt
 * @option back
 * @value back
 * @option start
 * @value start
 * @option L3
 * @value l3
 * @option R3
 * @value r3
 * @option cross key up
 * @value up
 * @option cross key down
 * @value down
 * @option cross key left
 * @value left
 * @option cross key right
 * @value right
 * @default back
 * @desc Set game pad key for Delete key in quest menu.
 * 
 * @param QuestConditionIcons
 * @text Quest Menu List Condition Category
 * @parent QuestMenuSetup
 * @type number[]
 * @default ["193","191","194"]
 * @desc Used in quest menu list. 1 is active 2 is Reported 3 is failed. you can open icon list from text tab then right click.
 * 
 * @param QuestNaviCommandName
 * @text Quest Navigator Command Name
 * @parent QuestMenuSetup
 * @type string[]
 * @default ["SetNavi","UnsetNavi","Cancel"]
 * @desc Setup name for SetNavi command. 1 is for SetNavi 2 is for UnsetNavi 3 is for Cancel.
 * 
 * @param QuestDataPageKey
 * @text Turn Page Key Settings
 * @parent QuestDataSetup
 * @type struct<QuestDataPageKeySettings>
 * @desc This is used in quest info window to change page.
 * 
 * @param QuestDataPageUpLabel
 * @text Page Return Key Label
 * @parent QuestDataSetup
 * @type struct<QuestDataPageUpLabelSetup>
 * @desc This is used in quest info window to show returning page key`s label.
 * 
 * @param QuestDataPageDownLabel
 * @text Page Forward Key Label
 * @parent QuestDataSetup
 * @type struct<QuestDataPageDownLabelSetup>
 * @desc This is used in quest info window to show forwarding page key`s label.
 * 
 * @param QuestDataDifficultySetup
 * @text Difficulty Settings
 * @parent QuestDataSetup
 * @type struct<QuestDataDifficultySettings>
 * @desc This is used in quest info window. difficulty icon setup. you can open icon list from text tab then right click.
 * 
 * @param QuestDataInfoLabel
 * @text Page Information Label
 * @parent QuestDataSetup
 * @type string[]
 * @default ["Info","Objectives"]
 * @desc This is used in quest info window. 1 is for page 1 label 2 is for page 2 label.
 * 
 * @param QuestDataClientLabel
 * @text Client Label
 * @parent QuestDataSetup
 * @type string
 * @default Client
 * @desc This is used in quest info window.
 * 
 * @param QuestDataLocationLabel
 * @text Client Location Label
 * @parent QuestDataSetup
 * @type struct<QuestDataLocationSettings>
 * @desc This is used in quest info window.
 * 
 * @param QuestDataQuestAreaLabel
 * @text Activity Area Label
 * @parent QuestDataSetup
 * @type struct<QuestDataQuestAreaSettings>
 * @desc This is used in quest info window.
 * 
 * @param QuestDataContentLabel
 * @text Quest Summary Label
 * @parent QuestDataSetup
 * @type string
 * @default Summary
 * @desc This is used in quest info window.
 * 
 * @param QuestDataRewardLabel
 * @text Quest Reward Labels
 * @parent QuestDataSetup
 * @type struct<QuestDataRewardSettings>
 * @desc This is used in quest info window.
 * 
 * @param QuestNaviMapSceneKey
 * @text Navigator Key for Map Scene
 * @parent QuestNaviSetup
 * @type struct<QuestNaviMapSceneKeySetup>
 * @desc Setup if you want player to use key and show/hide quest navigator.
 * 
 * @param QuestAssentedSoundData
 * @text Quest Assented Sound
 * @parent QuestOtherSounds
 * @type struct<QuestAssentSoundSettings>
 * @desc Setup sound(SE) when quest is assented.
 * 
 * @param QuestGetSoundData
 * @text Quest objective Added Sound
 * @parent QuestOtherSounds
 * @type struct<QuestGetSoundSettings>
 * @desc Setup sound(SE) when quest objectives has been added amount.
 * 
 * @param QuestLostSoundData
 * @text Quest Objective Subtracted Sound
 * @parent QuestOtherSounds
 * @type struct<QuestLostSoundSettings>
 * @desc Setup sound(SE) when quest objectives has been subtracted amount.
 * 
 * @param QuestObjClearSoundData
 * @text Quest Objective Accomplished Sound
 * @parent QuestOtherSounds
 * @type struct<QuestObjClearSoundSettings>
 * @desc Setup sound(SE) when quest objectives has been accomplished.
 * 
 * @param QuestReportSoundData
 * @text Quest Reported Sound
 * @parent QuestOtherSounds
 * @type struct<QuestReportSoundSettings>
 * @desc Setup sound(ME) when quest is reported.
 * 
 * @param QuestFailedSoundData
 * @text Quest Failed Sound
 * @parent QuestOtherSounds
 * @type struct<QuestFailedSoundSettings>
 * @desc Setup sound(ME) when quest is failed.
 */

/*~struct~QuestRequirementSetups:
 * @param UseActorLevel
 * @text Actor Level
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Setup if you want to use Actor level for Requirement to assent.
 * 
 * @param UseNeededMember
 * @text Required Members
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Setup if you want to use Required Members for Requirement to assent.
 * 
 * @param UseOutedMember
 * @text Exclude Members
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Setup if you want to use Exclude Members for Requirement to assent.
 * 
 * @param UseMaxMember
 * @text Max Member
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Setup if you want to use Max Member for Requirement to assent.
 * 
 * @param UseSw
 * @text Switches
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Setup if you want to use Switches for Requirement to assent.
 * 
 * @param UseVal
 * @text Variables
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Setup if you want to use Variables for Requirement to assent.
 * 
 * @param UseQuestAssented
 * @text Assented Required Quests
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Setup if you want to use Assented Required Quests for Requirement to assent.
 * 
 * @param UseQuestReported
 * @text Reported Required Quests
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Setup if you want to use Reported Required Quests for Requirement to assent.
 */

/*~struct~QuestFailedSoundSettings:
 * @param UseQuestSound
 * @text Use Sound(ME)
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Set if you want to use ME for when quest failed.
 * 
 * @param QuestSound
 * @text Sound(ME) file
 * @type file
 * @dir audio/me
 * @default Gag3
 * @desc Setup ME sound file.
 */

/*~struct~QuestReportSoundSettings:
 * @param UseQuestSound
 * @text Use Sound(ME)
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Set if you want to use ME for when quest reported.
 * 
 * @param QuestSound
 * @text Sound(ME) file
 * @type file
 * @dir audio/me
 * @default Victory1
 * @desc Setup ME sound file.
 */

/*~struct~QuestObjClearSoundSettings:
 * @param UseQuestSound
 * @text Use Sound(ME)
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Set if you want to use ME for when quest objective accomplished.
 * 
 * @param QuestSound
 * @text Sound(ME) file
 * @type file
 * @dir audio/me
 * @default Item
 * @desc Setup ME sound file.
 */

/*~struct~QuestLostSoundSettings:
 * @param UseQuestSound
 * @text Use Sound(SE)
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Set if you want to use SE for when quest objective subtracted.
 * 
 * @param QuestSound
 * @text Sound(SE) file
 * @type file
 * @dir audio/se
 * @default Miss
 * @desc Setup SE sound file.
 */

/*~struct~QuestGetSoundSettings:
 * @param UseQuestSound
 * @text Use Sound(SE)
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Set if you want to use SE for when quest objective added.
 * 
 * @param QuestSound
 * @text Sound(SE) file
 * @type file
 * @dir audio/se
 * @default Item1
 * @desc Setup SE sound file.
 */

/*~struct~QuestAssentSoundSettings:
 * @param UseQuestSound
 * @text Use Sound(SE)
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc Set if you want to use SE for when quest assented.
 * 
 * @param QuestSound
 * @text Sound(SE) file
 * @type file
 * @dir audio/se
 * @default Book2
 * @desc Setup SE sound file.
 */

/*~struct~QuestNaviMapSceneKeySetup:
 * @param UseMapKey
 * @text Enable Map Navigator key
 * @type Boolean
 * @on Enable
 * @off Disable
 * @default true
 * @desc Setup if you want players to use key to let quest navigator show/hide.
 * 
 * @param MapSceneKey
 * @text Map Key for Quest Navigator
 * @type select
 * @option A Key
 * @value A
 * @option B Key
 * @value B
 * @option C Key
 * @value C
 * @option D Key
 * @value D
 * @option E Key
 * @value E
 * @option F Key
 * @value F
 * @option G Key
 * @value G
 * @option H Key
 * @value H
 * @option I Key
 * @value I
 * @option J Key
 * @value J
 * @option K Key
 * @value K
 * @option L Key
 * @value L
 * @option M Key
 * @value M
 * @option N Key
 * @value N
 * @option O Key
 * @value O
 * @option P Key
 * @value P
 * @option Q Key
 * @value pageup
 * @option R Key
 * @value R
 * @option S Key
 * @value S
 * @option T Key
 * @value T
 * @option U Key
 * @value U
 * @option V Key
 * @value V
 * @option W Key
 * @value pagedown
 * @option Y Key
 * @value Y
 * @default D
 * @desc Setup witch key to use for map quest navigator.
 * 
 * @param MapScenePadKey
 * @text [Pad]Map Key for Quest Navigator
 * @parent QuestMenuSetup
 * @type select
 * @option A
 * @value ok
 * @option B
 * @value cancel
 * @option X
 * @value shift
 * @option Y
 * @value menu
 * @option LB
 * @value pageup
 * @option RB
 * @value pagedown
 * @option LT
 * @value lt
 * @option RT
 * @value rt
 * @option back
 * @value back
 * @option start
 * @value start
 * @option L3
 * @value l3
 * @option R3
 * @value r3
 * @option cross key up
 * @value up
 * @option cross key down
 * @value down
 * @option cross key left
 * @value left
 * @option cross key right
 * @value right
 * @default rt
 * @desc Setup game pad witch key to use for map quest navigator.
 */

/*~struct~QuestDataRewardSettings:
 * @param RewardLabelName
 * @text Reward Label
 * @type string
 * @default Rewards
 * @desc This is used in quest info window.
 * 
 * @param RewardExpIcon
 * @text Exp Icon
 * @type number
 * @default 77
 * @desc Setup icon index for exp reward. you can open icon list from text tab then right click.
 * 
 * @param RewardExpUnit
 * @text Exp Unit
 * @type string
 * @default EXP
 * @desc Seup unit for exp.
 * 
 * @param RewardGoldIcon
 * @text Gold Icon
 * @type number
 * @default 313
 * @desc Setup icon index for gold reward. you can open icon list from text tab then right click.
 * 
 * @param RewardGoldUnit
 * @text Gold Unit
 * @type string
 * @default G
 * @desc Setup unit for gold.
 */

/*~struct~QuestDataQuestAreaSettings:
 * @param LocationLabelName
 * @text Activity Area Label
 * @type string
 * @default Activity Area
 * @desc This is used in quest info window.
 * 
 * @param LocationLabelIcon
 * @text Activity Area Icon
 * @type number
 * @default 190
 * @desc Setup icon index for activity Area. you can open icon list from text tab then right click.
 */

/*~struct~QuestDataLocationSettings:
 * @param LocationLabelName
 * @text Client Location Label
 * @type string
 * @default Client Location
 * @desc This is used in quest info window.
 * 
 * @param LocationLabelIcon
 * @text Client Location Icon
 * @type number
 * @default 190
 * @desc Setup icon index for client location. you can open icon list from text tab then right click.
 */

/*~struct~QuestDataDifficultySettings:
 * @param IconPacks
 * @text Difficulty Icon Pack
 * @type string[]
 * @default ["5,5,5,5,5","4,4,4,4","3,3,3","2,2"]
 * @desc Setup icon index and use ,(comma) to add anther icon to the same roll. id will be started from 0,1,2...etc.
 * 
 * @param TextColor
 * @text Difficulty Text Color
 * @type number
 * @default 18
 * @desc Set system color code for difficulty text.
 */

/*~struct~QuestDataPageDownLabelSetup:
 * @param PageDownIcon
 * @text Page Forward Icon
 * @type number
 * @min 0
 * @default 189
 * @desc Setup icon for page forward. you can open icon list from text tab then right click.
 * 
 * @param PageDownKeyLabel
 * @text Page Forward Label
 * @type string
 * @default W(RB):
 * @desc Set page forward label. 【example】write key to use so player will know witch key to use.
 */

/*~struct~QuestDataPageUpLabelSetup:
 * @param PageUpIcon
 * @text Page Return Icon
 * @type number
 * @min 0
 * @default 187
 * @desc Setup icon for page return. you can open icon list from text tab then right click.
 * 
 * @param PageUpKeyLabel
 * @text Page Return Label
 * @type string
 * @default :Q(LB)
 * @desc Set page return label. 【example】write key to use so player will know witch key to use.
 */

/*~struct~QuestDataPageKeySettings:
 * @param PageUpKey
 * @text Page Return Key
 * @type select
 * @option A Key
 * @value A
 * @option B Key
 * @value B
 * @option C Key
 * @value C
 * @option D Key
 * @value D
 * @option E Key
 * @value E
 * @option F Key
 * @value F
 * @option G Key
 * @value G
 * @option H Key
 * @value H
 * @option I Key
 * @value I
 * @option J Key
 * @value J
 * @option K Key
 * @value K
 * @option L Key
 * @value L
 * @option M Key
 * @value M
 * @option N Key
 * @value N
 * @option O Key
 * @value O
 * @option P Key
 * @value P
 * @option Q Key
 * @value pageup
 * @option R Key
 * @value R
 * @option S Key
 * @value S
 * @option T Key
 * @value T
 * @option U Key
 * @value U
 * @option V Key
 * @value V
 * @option W Key
 * @value pagedown
 * @option Y Key
 * @value Y
 * @default pageup
 * @desc Setup page returning key for quest info window.
 * 
 * @param PageDownKey
 * @text Page Forward Key
 * @type select
 * @option A Key
 * @value A
 * @option B Key
 * @value B
 * @option C Key
 * @value C
 * @option D Key
 * @value D
 * @option E Key
 * @value E
 * @option F Key
 * @value F
 * @option G Key
 * @value G
 * @option H Key
 * @value H
 * @option I Key
 * @value I
 * @option J Key
 * @value J
 * @option K Key
 * @value K
 * @option L Key
 * @value L
 * @option M Key
 * @value M
 * @option N Key
 * @value N
 * @option O Key
 * @value O
 * @option P Key
 * @value P
 * @option Q Key
 * @value pageup
 * @option R Key
 * @value R
 * @option S Key
 * @value S
 * @option T Key
 * @value T
 * @option U Key
 * @value U
 * @option V Key
 * @value V
 * @option W Key
 * @value pagedown
 * @option Y Key
 * @value Y
 * @default pagedown
 * @desc Setup page forwarding key for quest info window.
 * 
 * @param PageChangeSound
 * @text Setup Sound(SE) for Changing Pages
 * @type file
 * @dir audio/se
 * @default Book2
 */

/*~struct~QuestMenuQuestCategorySetup:
 * @param CategoryID
 * @text Quest Filter Category ID
 * @type string[]
 * @default ["cat0","cat1","cat2","cat3"]
 * @desc Setup category ID as cat + ID. *cat0 will be needed as all.
 * 
 * @param CategoryName
 * @text Quest Filter Category Name
 * @type string[]
 * @default ["All","Talk","Gather","Fight"]
 * @desc Setup category name linked to category id index.
 */

/*~struct~QuestMenuConditionCategorySetup:
 * @param CategoryIconAll
 * @text Icon for All
 * @type number
 * @min 0
 * @default 187
 * @desc Setup icon index for quest condition 'All'. you can open icon list from text tab then right click.
 * 
 * @param CategoryNameAll
 * @text Name for All
 * @type string
 * @default All
 * @desc Setup Name for quest condition 'All'.
 * 
 * @param CategoryIconActive
 * @text Icon for Active
 * @type number
 * @min 0
 * @default 189
 * @desc Setup icon index for quest condition 'Active'. you can open icon list from text tab then right click.
 * 
 * @param CategoryNameActive
 * @text Name for Active
 * @type string
 * @default Active
 * @desc Setup Name for quest condition 'Active'.
 * 
 * @param CategoryIconCleared
 * @text Icon for Reported
 * @type number
 * @min 0
 * @default 191
 * @desc Setup icon index for quest condition 'Reported'. you can open icon list from text tab then right click.
 * 
 * @param CategoryNameCleared
 * @text Name for Reported
 * @type string
 * @default Reported
 * @desc Setup Name for quest condition 'Reported'.
 * 
 * @param CategoryIconFailed
 * @text Icon for Failed
 * @type number
 * @min 0
 * @default 194
 * @desc Setup icon index for quest condition 'Failed'. you can open icon list from text tab then right click.
 * 
 * @param CategoryNameFailed
 * @text Name for Failed
 * @type string
 * @default Failed
 * @desc Setup Name for quest condition 'Failed'. *this will be used when failing mode is enabled.
 */

/*~struct~FontInfomation:
 * @param FontName
 * @text Font Face Name
 * @type string
 * @desc Setup font face name to use in entire quest system. *don't set font face name if you want to use default font.
 * 
 * @param FontSize
 * @text Font Size
 * @type number
 * @default 16
 * @desc Setup font size to use in entire quest system. *set 0 to use default font size.
 */

/*~struct~QuestMenuCommandInfomation:
 * @param AddToMenuCommand
 * @text Add Quest Menu Command to Menu
 * @type boolean
 * @on Add command
 * @off Don't add command
 * @default true
 * @desc Setup if you want to add quest menu command to default main menu.
 * 
 * @param QuestMenuCommandName
 * @text Quest Menu Command Name
 * @type string
 * @default Quest
 * @desc Setup name for quest command.
 */

//=============================================================================
//  【QuestCustamizeSettings】
//=============================================================================

/*~struct~QuestCustamizeSettings:
 * @param DefaultDesigns
 * @text Simple Design Settings
 * 
 * @param TextColors
 * @text Text Color Settings
 * 
 * @param BoardWindowSetup
 * @text Quest Board Window Settings
 * 
 * @param MustWindowSetup
 * @text Requirement Window Settings
 * 
 * @param DataWindowSetup
 * @text Quest Info Window Settings
 * 
 * @param NavWindowSetup
 * @text Quest Navigator Window Settings
 * 
 * @param QuestMenuSetup
 * @text Quest Menu Scene Settings
 * 
 * @param AllCommandSetup
 * @text Each Commands Settings
 * 
 * @param WindowSets
 * @text Witch Window to Use Simple Design
 * @parent DefaultDesigns
 * @type struct<WinDesignSet>
 * @desc Setup witch window to use simple design.
 * 
 * @param BoardSet
 * @text Quest Board Design Settings
 * @parent DefaultDesigns
 * @type struct<WinBoardSet>
 * @desc This list will be the same top to down order that is show on the quest board window.
 * 
 * @param NeededSet
 * @text Requirement Design Settings
 * @parent DefaultDesigns
 * @type struct<WinNeededSet>
 * @desc This list will be the same top to down order that is show on the Requirement window.
 * 
 * @param DataSet
 * @text Quest Info Design Settings
 * @parent DefaultDesigns
 * @type struct<WinDataSet>
 * @desc This list will be the same top to down order that is show on the quest info window.
 * 
 * @param HeadingColor
 * @text Heading Color
 * @parent TextColors
 * @type string
 * @default #99ccff
 * @desc Set color code for heading color. *I`ve described Website link in help for color codes.
 * 
 * @param DealOkColor
 * @text Condition Meet Color
 * @parent TextColors
 * @type string
 * @default #00e060
 * @desc Set color code for condition has been meet. *I`ve described Website link in help for color codes.
 * 
 * @param DealNoColor
 * @text Condition Not Meet Color
 * @parent TextColors
 * @type string
 * @default #ff2020
 * @desc Set color code for condition did not meet. *I`ve described Website link in help for color codes.
 * 
 * @param NaviColor
 * @text Navigator Setted Color
 * @parent TextColors
 * @type string
 * @default #83ff83
 * @desc Set color code for when quest is set to navigate in quest menu. *I`ve described Website link in help for color codes.
 * 
 * @param AreaColor
 * @text Activity Area Color
 * @parent TextColors
 * @type string
 * @default #83ff83
 * @desc Set color code for activity area color in navigator. *I`ve described Website link in help for color codes.
 * 
 * @param ExpGoldColor
 * @text Reward Unit Color
 * @parent TextColors
 * @type string
 * @default #84a9ff
 * @desc Set color code for reward unit color in quest info. *I`ve described Website link in help for color codes.
 * 
 * @param BoardWindow
 * @text Quest Board Window Settings
 * @parent BoardWindowSetup
 * @type struct<BoardWindowSettings>
 * @desc Quest board window settings.
 * 
 * @param BoardData
 * @text Quest Board Data Settings
 * @parent BoardWindowSetup
 * @type struct<BoardDataSettings>
 * @desc Quest board data settings.
 * 
 * @param MustWindow
 * @text Requirement Window Settings
 * @parent MustWindowSetup
 * @type struct<MustWindowSettings>
 * @desc Requirement window settings.
 * 
 * @param MustData
 * @text Requirement Data Settings
 * @parent MustWindowSetup
 * @type struct<MustDataSettings>
 * @desc Requirement data settings.
 * 
 * @param DataWindow
 * @text Quest Info Window Settings
 * @parent DataWindowSetup
 * @type struct<DataWindowSettings>
 * @desc Quest info window settings.
 * 
 * @param QuestDatas
 * @text Quest Info Data Settings
 * @parent DataWindowSetup
 * @type struct<QuestDatasSettings>
 * @desc Quest info data settings.
 * 
 * @param NavWindow
 * @text Quest Navigator Window Settings
 * @parent NavWindowSetup
 * @type struct<NavWindowSettings>
 * @desc Quest Navigator Window Settings.
 * 
 * @param NavData
 * @text Quest Navigator Data Settings
 * @parent NavWindowSetup
 * @type struct<NavDataSettings>
 * @desc Quest navigator data settings.
 * 
 * @param MenuWindow
 * @text Quest Menu All Window Settings
 * @parent QuestMenuSetup
 * @type struct<MenuWindowSettings>
 * @desc Quest menu all window settings.
 * 
 * @param MenuCommand
 * @text Command Windows Settings
 * @parent AllCommandSetup
 * @type struct<MenuCommandSettings>
 * @desc Command window settings.
 */

/*~struct~NavDataSettings:
 * @param QuestNameX
 * @text Quest Name X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest name x coordinate.
 * 
 * @param QuestNameY
 * @text Quest Name Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest name y coordinate.
 * 
 * @param AreaLabelX
 * @text Activity Area Label X Coordinate
 * @type string
 * @default 0
 * @desc Adjust activity area label x coordinate.
 * 
 * @param AreaLabelY
 * @text Activity Area Label Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust activity area label y coordinate.
 * 
 * @param AreaX
 * @text Activity Area X Coordinate
 * @type string
 * @default 0
 * @desc Adjust activity area x coordinate.
 * 
 * @param AreaY
 * @text Activity Area Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust activity area y coordinate.
 * 
 * @param ObjectiveX
 * @text Objectives Start X Coordinate
 * @type string
 * @default 0
 * @desc Adjust objectives start x coordinate.
 * 
 * @param ObjectiveY
 * @text Objectives Start Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust objectives start y coordinate.
 */

/*~struct~NavWindowSettings:
 * @param NavX
 * @text Quest Navigator Window X Coordinate
 * @type string
 * @default 408
 * @desc Quest navigator window x coordinate.
 * 
 * @param NavY
 * @text Quest Navigator Window Y Coordinate
 * @type string
 * @default 0
 * @desc Quest navigator window y coordinate.
 * 
 * @param NavWidth
 * @text Quest Navigator Window Width
 * @type string
 * @default 408
 * @desc Quest navigator window width.
 * 
 * @param NavHeight
 * @text Quest Navigator Window Height
 * @type string
 * @default 624
 * @desc Quest navigator window height.*this will be the limit of the height to show objectives so you will need to set it higher.
 * 
 * @param NavOpacity
 * @text Quest Navigator Window Opacity
 * @type string
 * @default 0
 * @desc Quest navigator window opacity. 0:255
 * 
 * @param NavBackOpacity
 * @text Quest Navigator Window Back Opacity
 * @type string
 * @default 0
 * @desc Quest navigator window back opacity. 0:255
 * 
 * @param NavBackImg
 * @text Quest Navigator Background Img
 * @type struct<NavBackImgSetup>
 * @desc You can set background img for quest navigator. when using background then original variable background will turned off.
 */

/*~struct~NavBackImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~QuestDatasSettings:
 * @param flagX
 * @text Flag X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest info window flag x coordinate.
 * 
 * @param flagY
 * @text Flag Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest info window flag y coordinate.
 * 
 * @param flagFontSize
 * @text Flag Font Size
 * @type string
 * @default 26
 * @desc Quest info window flag font size.
 * 
 * @param DifficultyX
 * @text Difficulty X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest info window difficulty x coordinate.
 * 
 * @param DifficultyY
 * @text Difficulty Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest info window difficulty y coordinate.
 * 
 * @param DifficultyIconX
 * @text Difficulty Icon Pack X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest info window difficulty icon pack x coordinate.
 * 
 * @param DifficultyIconY
 * @text Difficulty Icon Pack Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest info window difficulty icon pack y coordinate.
 * 
 * @param DifficultyIconW
 * @text Difficulty Icon Pack Space
 * @type string
 * @default -26
 * @desc Set difficulty icon pack spacing. *minus will go on top of each other from left to right.
 * 
 * @param QuestNameX
 * @text Quest Name X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest info window quest name x coordinate.
 * 
 * @param QuestNameY
 * @text Quest Name Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest info window quest name y coordinate.
 * 
 * @param QuestNameFontSize
 * @text Quest Name Font Size
 * @type string
 * @default 26
 * @desc This is used in quest info window.
 * 
 * @param PageLabelX
 * @text Quest Page Information X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust Global Settings > Page Information Label x coordinate.
 * 
 * @param PageLabelY
 * @text Quest Page Information Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust Global Settings > Page Information Label y coordinate.
 * 
 * @param PageLabelPageX
 * @text Quest Page Number X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust page number x coordinate.
 * 
 * @param PageLabelPageY
 * @text Quest Page Number Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust page number y coordinate.
 * 
 * @param PageUpKeyX
 * @text Quest Page Return Key Label X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust page return key label x coordinate.
 * 
 * @param PageUpKeyY
 * @text Quest Page Return Key Label Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust page return key label y coordinate.
 * 
 * @param PageUpKeyIconY
 * @text Quest Page Return Key Icon Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust page return key icon y coordinate.
 * 
 * @param PageDownKeyX
 * @text Quest Page Forward Key Label X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust page Forward key label x coordinate.
 * 
 * @param PageDownKeyY
 * @text Quest Page Forward Key Label Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust page Forward key label y coordinate.
 * 
 * @param PageDownKeyIconY
 * @text Quest Page Forward Key Icon Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust page Forward key icon y coordinate.
 * 
 * @param LocationLabelX
 * @text Quest Client Location Label X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest client location label x coordinate.
 * 
 * @param LocationLabelY
 * @text Quest Client Location Label Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest client location label y coordinate.
 * 
 * @param LocationX
 * @text Quest Client Location X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest client location name x coordinate.
 * 
 * @param LocationY
 * @text Quest Client Location Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest client location name y coordinate.
 * 
 * @param ClientLabelX
 * @text Quest Client Label X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest client label x coordinate.
 * 
 * @param ClientLabelY
 * @text Quest Client Label Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest client label y coordinate.
 * 
 * @param ClientX
 * @text Quest Client X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest client name x coordinate.
 * 
 * @param ClientY
 * @text Quest Client Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest client name y coordinate.
 * 
 * @param ContentLabelX
 * @text Quest Summary Label X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest summary label x coordinate.
 * 
 * @param ContentLabelY
 * @text Quest Summary Label Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest summary label y coordinate.
 * 
 * @param ContentX
 * @text Quest Summary X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest summary x coordinate.
 * 
 * @param ContentY
 * @text Quest Summary Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest summary y coordinate.
 * 
 * @param RewardLabelX
 * @text Quest Reward Label X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest reward label x coordinate.
 * 
 * @param RewardLabelY
 * @text Quest Reward Label Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest reward label y coordinate.
 * 
 * @param RewardExpX
 * @text Quest Reward Exp X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest reward exp x coordinate.
 * 
 * @param RewardExpY
 * @text Quest Reward Exp Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest reward exp y coordinate.
 * 
 * @param RewardGoldX
 * @text Quest Reward Gold X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest reward gold x coordinate.
 * 
 * @param RewardGoldY
 * @text Quest Reward Gold Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest reward gold y coordinate.
 * 
 * @param RewardItemX
 * @text Quest Reward Item list Start X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest reward item list start x coordinate.
 * 
 * @param RewardItemY
 * @text Quest Reward Item list Start Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest info window. adjust quest reward item list start y coordinate.
 * 
 * @param RewardItemDrawMode
 * @text Quest Item Use Second Row
 * @type boolean
 * @on Use Second Row
 * @off Only One Row
 * @default true
 * @desc Select between second row mode or one row mode of the reward item list.
 * 
 * @param RewardItemSecondX
 * @text Second Row Start X Coordinate
 * @type string
 * @default 190
 * @desc Set second row start x coordinate for reward item list if you selected to use second row.
 */

/*~struct~DataWindowSettings:
 * @param DataX
 * @text Quest Info Window X Coordinate
 * @type string
 * @default 164
 * @desc Quest info window x coordinate.
 * 
 * @param DataY
 * @text Quest Info Window Y Coordinate
 * @type string
 * @default 28
 * @desc Quest info window y coordinate.
 * 
 * @param DataWidth
 * @text Quest Info Window Width
 * @type string
 * @default 488
 * @desc Quest info window width.
 * 
 * @param DataHeight
 * @text Quest Info Window Height
 * @type string
 * @default 568
 * @desc Quest info window height.
 * 
 * @param DataOpacity
 * @text Quest Info Window Opacity
 * @type string
 * @default 255
 * @desc Quest info window opacity. 0:255
 * 
 * @param DataBackOpacity
 * @text Quest Info Window Back Opacity
 * @type string
 * @default 192
 * @desc Quest info window back opacity. 0:255
 * 
 * @param DataBackImg
 * @text Quest Info Window Background Img
 * @type struct<DataBackImgSetup>
 * @desc You can set background img for quest info window.
 */

/*~struct~DataBackImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img Opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use.else top left is the coordinate.
 */

/*~struct~MenuCommandSettings:
 * @param AssentingX
 * @text Assenting Command X Coordinate
 * @type string
 * @default 288
 * @desc This is used in map scene. set assenting command x coordinate.
 * 
 * @param AssentingY
 * @text Assenting Command Y Coordinate
 * @type string
 * @default 258
 * @desc This is used in map scene. set assenting command y coordinate.
 * 
 * @param AssentingOpacity
 * @text Assenting Command Opacity
 * @type string
 * @default 255
 * @desc This is used in map scene. set assenting command opacity. 0:255
 * 
 * @param AssentingBackOpacity
 * @text Assenting Command Back Opacity
 * @type string
 * @default 255
 * @desc This is used in map scene. set assenting command back opacity. 0:255
 * 
 * @param AssentingBackImg
 * @text Assenting Command Background Img
 * @type struct<AssentingImgSetup>
 * @desc You can set background img for assenting command window.
 * 
 * @param ReportingX
 * @text Reporting Command X Coordinate
 * @type string
 * @default 288
 * @desc This is used in map scene. set reporting command x coordinate.
 * 
 * @param ReportingY
 * @text Reporting Command Y Coordinate
 * @type string
 * @default 258
 * @desc This is used in map scene. set reporting command y coordinate.
 * 
 * @param ReportingOpacity
 * @text Reporting Command Opacity
 * @type string
 * @default 255
 * @desc This is used in map scene. set reporting command opacity. 0:255
 * 
 * @param ReportingBackOpacity
 * @text Reporting Command Back Opacity
 * @type string
 * @default 255
 * @desc This is used in map scene. set reporting command back opacity. 0:255
 * 
 * @param ReportingBackImg
 * @text Reporting Command Background Img
 * @type struct<ReportingImgSetup>
 * @desc You can set background img for reporting command window.
 * 
 * @param FilterX
 * @text Filter Command X Coordinate
 * @type string
 * @default 288
 * @desc This is used in quest menu scene. set filter command x coordinate.
 * 
 * @param FilterY
 * @text Filter Command Y Coordinate
 * @type string
 * @default 204
 * @desc This is used in quest menu scene. set filter command y coordinate.
 * 
 * @param FilterOpacity
 * @text Filter Command Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu scene. set filter command opacity. 0:255
 * 
 * @param FilterBackOpacity
 * @text Filter Command Back Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu scene. set filter command back opacity. 0:255
 * 
 * @param FilterBackImg
 * @text Filter Command Background Img
 * @type struct<FilterImgSetup>
 * @desc You can set background img for filter command window.
 * 
 * @param NavCommandX
 * @text Quest Navi Set Command X Coordinate
 * @type string
 * @default 288
 * @desc This is used in quest menu and map scene. set quest navi set command x coordinate.
 * 
 * @param NavCommandY
 * @text Quest Navi Set Command Y Coordinate
 * @type string
 * @default 258
 * @desc This is used in quest menu and map scene. set quest navi set command y coordinate.
 * 
 * @param NavCommandOpacity
 * @text Quest Navi Set Command Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu and map scene. set quest navi set command opacity. 0:255
 * 
 * @param NavCommandBackOpacity
 * @text Quest Navi Set Command Back Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu and map scene. set quest navi set command back opacity. 0:255
 * 
 * @param NavCommandBackImg
 * @text Quest Navi Set Command Background Img
 * @type struct<NavCommandImgSetup>
 * @desc You can set background img for quest navi set command window.
 * 
 * @param CancelingX
 * @text Delete Command X Coordinate
 * @type string
 * @default 288
 * @desc This is used in quest menu scene. set delete command x coordinate.
 * 
 * @param CancelingY
 * @text Delete Command Y Coordinate
 * @type string
 * @default 258
 * @desc This is used in quest menu scene. set delete command y coordinate.
 * 
 * @param CancelingOpacity
 * @text Delete Command Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu scene. set delete command opacity. 0:255
 * 
 * @param CancelingBackOpacity
 * @text Delete Command Back Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu scene. set delete command back opacity. 0:255
 * 
 * @param CancelingBackImg
 * @text Delete Command Background Img
 * @type struct<CancelingImgSetup>
 * @desc You can set background img for delete command window.
 */

/*~struct~ReportingImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~AssentingImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~CancelingImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~NavCommandImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~FilterImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~MenuWindowSettings:
 * @param HelpWindowX
 * @text Help Window X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest menu. help window x coordinate.
 * 
 * @param HelpWindowY
 * @text Help Window Y Coordinate
 * @type string
 * @default 566
 * @desc This is used in quest menu. help window y coordinate.
 * 
 * @param HelpWindowWidth
 * @text Help Window Width
 * @type string
 * @default 816
 * @desc This is used in quest menu. help window width.
 * 
 * @param HelpWindowHeight
 * @text Help Window Height
 * @type string
 * @default 58
 * @desc This is used in quest menu. help window height.
 * 
 * @param HelpWindowOpacity
 * @text Help Window Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu. help window opacity. 0:255
 * 
 * @param HelpWindowBackOpacity
 * @text Help Window Back Opacity
 * @type string
 * @default 192
 * @desc This is used in quest menu. help window back opacity. 0:255
 * 
 * @param IconCategoryX
 * @text Category Window X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest menu. category window x coordinate.
 * 
 * @param IconCategoryY
 * @text Category Window Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest menu. category window y coordinate.
 * 
 * @param IconCategoryWidth
 * @text Category Window Width
 * @type string
 * @default 326.4
 * @desc This is used in quest menu. category window width.
 * 
 * @param IconCategoryHeight
 * @text Category Window Height
 * @type string
 * @default 102
 * @desc This is used in quest menu. category window height.
 * 
 * @param IconCategoryOpacity
 * @text Category Window Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu. category window opacity. 0:255
 * 
 * @param IconCategoryBackOpacity
 * @text Category Window Back Opacity
 * @type string
 * @default 192
 * @desc This is used in quest menu. category window back opacity. 0:255
 * 
 * @param IconCategoryLabelX
 * @text Category Sub Window X Coordinate
 * @type string
 * @default 53.1
 * @desc This is used in quest menu. category sub window x coordinate.
 * 
 * @param IconCategoryLabelY
 * @text Category Sub Window Y Coordinate
 * @type string
 * @default 36
 * @desc This is used in quest menu. category sub window y coordinate.
 * 
 * @param IconCategoryLabelWidth
 * @text Category Sub Window Width
 * @type string
 * @default 220
 * @desc This is used in quest menu. category sub window width.
 * 
 * @param IconCategoryLabelHeight
 * @text Category Sub Window Height
 * @type string
 * @default 78
 * @desc This is used in quest menu. category sub window height.
 * 
 * @param IconCategoryLabelOpacity
 * @text Category Sub Window Opacity
 * @type string
 * @default 0
 * @desc This is used in quest menu. category sub window opacity. 0:255
 * 
 * @param IconCategoryLabelBackOpacity
 * @text Category Sub Window Back Opacity
 * @type string
 * @default 0
 * @desc This is used in quest menu. category sub window back opacity. 0:255
 * 
 * @param QuestListX
 * @text Quest List Window X Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest menu. quest list window x coordinate.
 * 
 * @param QuestListY
 * @text Quest List Window Y Coordinate
 * @type string
 * @default 102
 * @desc This is used in quest menu. quest list window y coordinate.
 * 
 * @param QuestListWidth
 * @text Quest List Window Width
 * @type string
 * @default 326.4
 * @desc This is used in quest menu. quest list window width.
 * 
 * @param QuestListHeight
 * @text Quest List Window Height
 * @type string
 * @default 464
 * @desc This is used in quest menu. quest list window Height.
 * 
 * @param QuestListOpacity
 * @text Quest List Window Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu. quest list window opacity. 0:255
 * 
 * @param QuestListBackOpacity
 * @text Quest List Window Back Opacity
 * @type string
 * @default 192
 * @desc This is used in quest menu. quest list window back opacity. 0:255
 * 
 * @param QuestDataX
 * @text Quest Info Window X Coordinate
 * @type string
 * @default 327.4
 * @desc This is used in quest menu. quest info window x coordinate.
 * 
 * @param QuestDataY
 * @text Quest Info Window Y Coordinate
 * @type string
 * @default 0
 * @desc This is used in quest menu. quest info window y coordinate.
 * 
 * @param QuestDataWidth
 * @text Quest Info Window Width
 * @type string
 * @default 488
 * @desc This is used in quest menu. quest info window width.
 * 
 * @param QuestDataHeight
 * @text Quest Info Window Height
 * @type string
 * @default 566
 * @desc This is used in quest menu. quest info window height.
 * 
 * @param QuestDataOpacity
 * @text Quest Info Window Opacity
 * @type string
 * @default 255
 * @desc This is used in quest menu. quest info window opacity. 0:255
 * 
 * @param QuestDataBackOpacity
 * @text Quest Info Window Back Opacity
 * @type string
 * @default 192
 * @desc This is used in quest menu. quest info window back opacity. 0:255
 * 
 * @param QuestMenuImg
 * @text Quest Menu Scene Background Img
 * @type struct<QuestMenuImgSetup>
 * @desc You can set background img for quest menu scene.
 */

/*~struct~QuestMenuImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~MustDataSettings:
 * @param flagX
 * @text Flag X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window flag x coordinate.
 * 
 * @param flagY
 * @text Flag Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window flag y coordinate.
 * 
 * @param flagFontSize
 * @text Flag Font Size
 * @type string
 * @default 14
 * @desc Quest requirement window flag font size.
 * 
 * @param questDifficultyX
 * @text Difficulty X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window difficulty x coordinate.
 * 
 * @param questDifficultyY
 * @text Difficulty Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window difficulty y coordinate.
 * 
 * @param questNameX
 * @text Quest Name X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window quest name x coordinate.
 * 
 * @param questNameY
 * @text Quest Name Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window quest name y coordinate.
 * 
 * @param questNameFontSize
 * @text Quest Name Font Size
 * @type string
 * @default 26
 * @desc This is used in quest requirement window.
 * 
 * @param maxMemberX
 * @text Max Member X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window max member x coordinate.
 * 
 * @param maxMemberY
 * @text Max Member Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window max member y coordinate.
 * 
 * @param actorLevelX
 * @text Actor Level X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window actor level list start x coordinate.
 * 
 * @param actorLevelY
 * @text Actor Level Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window actor level list start y coordinate.
 * 
 * @param actorLevelNumberX
 * @text Actor Level Number X Coordniate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window actor level numbers x coordinate.
 * 
 * @param actorLevelNumberY
 * @text Actor Level Number Y Coordniate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window actor level numbers y coordinate.
 * 
 * @param actorNeedX
 * @text Required Member X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement window required member list start x coordinate.
 * 
 * @param actorNeedY
 * @text Required Member Y Coordinate
 * @type string
 * @default 230
 * @desc Adjust quest requirement window required member list start y coordinate.
 * 
 * @param actorOutX
 * @text Exclude Member X Coordinate
 * @type string
 * @default 190
 * @desc Adjust quest requirement window exclude member list start x coordinate.
 * 
 * @param actorOutY
 * @text Exclude Member Y Coordinate
 * @type string
 * @default 230
 * @desc Adjust quest requirement window exclude member list start y coordinate.
 * 
 * @param subPageTitleX
 * @text Sub Page Title X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window title x coordinate. *it use Global Settings > Requirement Label
 * 
 * @param subPageTitleY
 * @text Sub Page Title Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window title y coordinate. *it use Global Settings > Requirement Label
 * 
 * @param subPageTitleFontSize
 * @text Sub Title Font Size
 * @type string
 * @default 14
 * @desc This is used in quest requirement sub window.
 * 
 * @param subPageAreaX
 * @text Sub Page Activity Area X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window activity area x coordinate.
 * 
 * @param subPageAreaY
 * @text Sub Page Activity Area Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window activity area y coordinate.
 * 
 * @param subPageSwX
 * @text Sub Page Switches X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window switches x coordinate.
 * 
 * @param subPageSwY
 * @text Sub Page Switches y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window switches y coordinate.
 * 
 * @param subPageValX
 * @text Sub Page Variables X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window variables x coordinate.
 * 
 * @param subPageValY
 * @text Sub Page Variables Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window variables x coordinate.
 * 
 * @param subPageAssentedX
 * @text Sub Page Assent Required Quests X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window assent required quests x coordinate.
 * 
 * @param subPageAssentedY
 * @text Sub Page Assent Required Quests Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window assent required quests y coordinate.
 * 
 * @param subPageReportedX
 * @text Sub Page Report Required Quests X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window report required quests x coordinate.
 * 
 * @param subPageReportedY
 * @text Sub Page Report Required Quests Y Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest requirement sub window report required quests y coordinate.
 * 
 * @param subPageDetailX
 * @text Sub Page Requirement Meet Info X Coordinate
 * @type string
 * @default 0
 * @desc Set quest requirement sub window requirement meet info x coordinate.
 * 
 * @param subPageDetailY
 * @text Sub Page Requirement Meet Info Y Coordinate
 * @type string
 * @default 120
 * @desc Set quest requirement sub window requirement meet info y coordinate.
 */

/*~struct~MustWindowSettings:
 * @param MainX
 * @text Quest Requirement Window X Coordinate
 * @type string
 * @default 0
 * @desc Quest requirement window x coordinate.
 * 
 * @param MainY
 * @text Quest Requirement Window Y Coordinate
 * @type string
 * @default 72
 * @desc Quest requirement window y coordinate.
 * 
 * @param MainWidth
 * @text Quest Requirement Window Width
 * @type string
 * @default 408
 * @desc Quest requirement window width.
 * 
 * @param MainHeight
 * @text Quest Requirement Window Height
 * @type string
 * @default 468
 * @desc Quest requirement window height.
 * 
 * @param MainOpacity
 * @text Quest Requirement Window Opacity
 * @type string
 * @default 255
 * @desc Quest requirement window opacity. 0:255
 * 
 * @param MainBackOpacity
 * @text Quest Requirement Window Back Opacity
 * @type string
 * @default 192
 * @desc Quest requirement window back opacity. 0:255
 * 
 * @param SubX
 * @text Quest Requirement Sub Window X Coordinate
 * @type string
 * @default 408
 * @desc Quest requirement sub window x coordinate.
 * 
 * @param SubY
 * @text Quest Requirement Sub Window Y Coordinate
 * @type string
 * @default 72
 * @desc Quest requirement sub window y coordinate.
 * 
 * @param SubWidth
 * @text Quest Requirement Sub Window Width
 * @type string
 * @default 408
 * @desc Quest requirement sub window width.
 * 
 * @param SubHeight
 * @text Quest Requirement Sub Window Height
 * @type string
 * @default 468
 * @desc Quest requirement sub window height.
 * 
 * @param SubOpacity
 * @text Quest Requirement Sub Window Opacity
 * @type string
 * @default 255
 * @desc Quest requirement sub window opacity. 0:255
 * 
 * @param SubBackOpacity
 * @text Quest Requirement Sub Window Back Opacity
 * @type string
 * @default 192
 * @desc Quest requirement sub window back opacity. 0:255
 * 
 * @param MustBackImg
 * @text Quest Requirement Window Background Img
 * @type struct<MustImgSetup>
 * @desc You can set background img for quest requirement window.
 */

/*~struct~MustImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~BoardDataSettings:
 * @param titleX
 * @text Quest Board Title X Coordniate
 * @type string
 * @default 0
 * @desc Adjust quest board window quest board title x coordinate.
 * 
 * @param titleY
 * @text Quest Board Title Y Coordniate
 * @type string
 * @default 0
 * @desc Adjust quest board window quest board title y coordinate.
 * 
 * @param titleFontSize
 * @text Quest Board Title Font Size
 * @type string
 * @default 26
 * @desc Quest board window quest title font size.
 * 
 * @param allLabelY
 * @text All Label Y Coordinate
 * @type string
 * @default 10
 * @desc Adjust quest board window quest name label, category label, difficulty label y coordinate at once.
 * 
 * @param questNameX
 * @text Quest Name X Coordinate
 * @type string
 * @default 95
 * @desc Quest board window quest name x coordinate.
 * 
 * @param questCategoryX
 * @text Quest Category X Coordinate
 * @type string
 * @default 280
 * @desc Quest board window quest category x coordinate.
 * 
 * @param questDifficultyX
 * @text Quest Difficulty X Coordinate
 * @type string
 * @default 195
 * @desc Quest board window quest difficulty x coordinate.
 * 
 * @param listNameX
 * @text Quest List Quest Name X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest list quest name x coordinate.
 * 
 * @param listCategoryX
 * @text Quest List Quest Category X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest list quest category x coordinate.
 * 
 * @param listDifficultyX
 * @text Quest List Quest Difficulty X Coordinate
 * @type string
 * @default 0
 * @desc Adjust quest list quest difficulty x coordinate.
 */

/*~struct~BoardWindowSettings:
 * @param MainX
 * @text Quest Board Window X Coordinate
 * @type string
 * @default 45
 * @desc Quest board window x coordinate.
 * 
 * @param MainY
 * @text Quest Board Window Y Coordinate
 * @type string
 * @default 28
 * @desc Quest board window y coordinate.
 * 
 * @param MainWidth
 * @text Quest Board Window Width
 * @type string
 * @default 726
 * @desc Quest board window width.
 * 
 * @param MainHeight
 * @text Quest Board Window Height
 * @type string
 * @default 556
 * @desc Quest board window height.
 * 
 * @param MainOpacity
 * @text Quest Board Window Opacity
 * @type string
 * @default 255
 * @desc Quest board window opacity. 0:255
 * 
 * @param MainBackOpacity
 * @text Quest Board Window Back Opacity
 * @type string
 * @default 255
 * @desc Quest board window back opacity. 0:255
 * 
 * @param ListX
 * @text Quest Board List Window X Coordinate
 * @type string
 * @default 60
 * @desc Quest board list window x coordinate.
 * 
 * @param ListY
 * @text Quest Board List Window Y Coordinate
 * @type string
 * @default 120
 * @desc Quest board list window y coordinate.
 * 
 * @param ListWidth
 * @text Quest Board List Window Width
 * @type string
 * @default 696
 * @desc Quest board list window width.
 * 
 * @param ListHeight
 * @text Quest Board List Window Height
 * @type string
 * @default 422
 * @desc Quest board list window height.
 * 
 * @param ListOpacity
 * @text Quest Board List Window Opacity
 * @type string
 * @default 0
 * @desc Quest board list window opacity. 0:255
 * 
 * @param ListBackOpacity
 * @text Quest Board List Window Back Opacity
 * @type string
 * @default 0
 * @desc Quest board list window back opacity. 0:255
 * 
 * @param BoardBackImg
 * @text Quest Board Window Background Img
 * @type struct<BoardImgSetup>
 * @desc You can set background img for quest board window.
 */

/*~struct~BoardImgSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use background img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from window x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from window y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~WinDataSet:
 * @param Set1
 * @text Background Design 1 Size
 * @type string
 * @default 33
 * @desc Quest info window background design 1 size.
 * 
 * @param Set2
 * @text Back Line 1 Y Coordinate
 * @type string
 * @default 34
 * @desc Quest info window back line 1 y coordinate.
 * 
 * @param Set3
 * @text Back Line 2 Y Coordinate
 * @type string
 * @default 70
 * @desc Quest info window back line 2 y coordinate.
 * 
 * @param Set4
 * @text Background Design 2 Y Coordinate
 * @type string
 * @default 71
 * @desc Quest info window background design 2 y coordinate.
 * 
 * @param Set5
 * @text Background Design 2 Size
 * @type string
 * @default 34
 * @desc Quest info window background design 2 size.
 * 
 * @param Set6
 * @text Back Line 3 Y Coordinate
 * @type string
 * @default 105
 * @desc Quest info window back line 3 y coordinate.
 * 
 * @param Set7
 * @text Client Line X Coordinate
 * @type string
 * @default 76
 * @desc Quest info window client line x coordinate.
 * 
 * @param Set8
 * @text Client Line Y Coordinate
 * @type string
 * @default 139
 * @desc Quest info window client line y coordinate.
 * 
 * @param Set9
 * @text Client Line Width
 * @type string
 * @default 144
 * @desc Quest info window client line width.
 * 
 * @param Set10
 * @text Client Location Line X Coordinate
 * @type string
 * @default 230
 * @desc Quest info window client location line x coordinate.
 * 
 * @param Set11
 * @text Client Location Line Y Coordinate
 * @type string
 * @default 139
 * @desc Quest info window client location line y coordinate.
 * 
 * @param Set12
 * @text Client Location Line Width
 * @type string
 * @default 240
 * @desc Quest info window client location line width.
 * 
 * @param Set13
 * @text Back Line 4 Y Coordinate
 * @type string
 * @default 180
 * @desc Quest info window back line 4 y coordinate.
 * 
 * @param Set14
 * @text Background Design 3 Y Coordinate
 * @type string
 * @default 182
 * @desc Quest info window background design 3 y coordinate.
 * 
 * @param Set15
 * @text Background Design 3 Size
 * @type string
 * @default 34
 * @desc Quest info window background design 3 size.
 * 
 * @param Set16
 * @text Back Line 5 Y Coordinate
 * @type string
 * @default 279
 * @desc Quest info window back line 5 y coordinate.
 * 
 * @param Set17
 * @text Background Design 4 Y Coordinate
 * @type string
 * @default 281
 * @desc Quest info window background design 4 y coordinate.
 * 
 * @param Set18
 * @text Background Design 4 Size
 * @type string
 * @default 34
 * @desc Quest info window background design 4 size.
 * 
 * @param Set19
 * @text Back Line 6 Y Coordinate
 * @type string
 * @default 142
 * @desc Quest info window back line 6 y coordinate.
 */

/*~struct~WinNeededSet:
 * @param Set1
 * @text Background Design 1 Size
 * @type string
 * @default 33
 * @desc Quest requirement window background design 1 size.
 * 
 * @param Set2
 * @text Back Line 1 Y Coordinate
 * @type string
 * @default 34
 * @desc Quest requirement window back line 1 y coordinate.
 * 
 * @param Set3
 * @text Back Line 2 Y Coordinate
 * @type string
 * @default 70
 * @desc Quest requirement window back line 2 y coordinate.
 * 
 * @param Set4
 * @text Actor Level Line X Coordinate
 * @type string
 * @default 0
 * @desc Quest requirement window actor level line x coordinate.
 * 
 * @param Set5
 * @text Actor Level Line Y Coordinate
 * @type string
 * @default 110
 * @desc Quest requirement window actor level line y coordinate.
 * 
 * @param Set6
 * @text Actor Level Line Width
 * @type string
 * @default 170
 * @desc Quest requirement window actor level line width.
 * 
 * @param Set7
 * @text Max Member Line X Coordinate
 * @type string
 * @default 190
 * @desc Quest requirement window max member line x coordinate.
 * 
 * @param Set8
 * @text Max Member Line Y Coordinate
 * @type string
 * @default 110
 * @desc Quest requirement window max member line y coordinate.
 * 
 * @param Set9
 * @text Max Member Line Width
 * @type string
 * @default 190
 * @desc Quest requirement window max member line width.
 * 
 * @param Set10
 * @text Required Member Line X Coordinate
 * @type string
 * @default 0
 * @desc Quest requirement window required member line x coordinate.
 * 
 * @param Set11
 * @text Required Member Line Y Coordinate
 * @type string
 * @default 38
 * @desc Quest requirement window required member line y coordinate.
 * 
 * @param Set12
 * @text Required Member Line Width
 * @type string
 * @default 170
 * @desc Quest requirement window required member line width.
 * 
 * @param Set13
 * @text Exclude Member Line X Coordinate
 * @type string
 * @default 0
 * @desc Quest requirement window exclude member line x coordinate.
 * 
 * @param Set14
 * @text Exclude Member Line Y Coordinate
 * @type string
 * @default 38
 * @desc Quest requirement window exclude member line y coordinate.
 * 
 * @param Set15
 * @text Exclude Member Line Width
 * @type string
 * @default 190
 * @desc Quest requirement window exclude member line width.
 * 
 * @param Set16
 * @text Background Design 2 Size
 * @tyep string
 * @default 33
 * @desc Quest requirement window background design 2 size.
 * 
 * @param Set17
 * @text Back Line 3 Y Coordinate
 * @type string
 * @default 34
 * @desc Quest requirement window back line 3 y coordinate.
 * 
 * @param Set18
 * @text Back Line 4 Y Coordinate
 * @type string
 * @default 70
 * @desc Quest requirement window back line 4 y coordinate.
 * 
 * @param Set19
 * @text Back Line 5 Y Coordinate
 * @type string
 * @default -40
 * @desc Quest requirement window back line 5 y coordinate.
 */

/*~struct~WinBoardSet:
 * @param Set1
 * @text Background Design 1 Size
 * @type string
 * @default 33
 * @desc Quest board window background design 1 size.
 * 
 * @param Set2
 * @text Background Design 2 Y Coordinate
 * @type string
 * @default 35
 * @desc Quest board window background design 2 y coordinate.
 * 
 * @param Set3
 * @text Background Design 2 Size
 * @type string
 * @default 14
 * @desc Quest board window background design 2 size.
 * 
 * @param Set4
 * @text Back Line 1 Y Coordinate
 * @type string
 * @default 49
 * @desc Quest board window back line 1 y coordinate.
 * 
 * @param Set5
 * @text Back Line 2 Y Coordinate
 * @type string
 * @default 80
 * @desc Quest board window back line 2 y coordinate.
 */

/*~struct~WinDesignSet:
 * @param UseAll
 * @text Use All Simple Design?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc This is the main switch of using all simple designs in each window.
 * 
 * @param UseBoard
 * @text Use in Quest Board Window
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc When Use all simple design is true then you can set if you want to use for quest board window.
 * 
 * @param UseNeeded
 * @text Use in Quest Requirement Window
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc When Use all simple design is true then you can set if you want to use for quest requirement window.
 * 
 * @param UseData
 * @text Use in Quest Info Window
 * @type boolean
 * @on Use
 * @off Don't use
 * @default true
 * @desc When Use all simple design is true then you can set if you want to use for quest info window.
 */

//=============================================================================
//  【QuestDatabase】
//=============================================================================

/*~struct~QuestDatabase:
 * @param QuestInfo
 * @text Informations
 * 
 * @param QuestOrderConditions
 * @text Requirements
 * 
 * @param QuestInfos
 * @text Descriptions
 * 
 * @param QuestObjectiveSettings
 * @text Objectivies
 * @type struct<QuestObjectiveData>[]
 * @desc Create objectives. *case Objective Type is Quest Object then no need to setup Objective ID.
 * 
 * @param QuestRewards
 * @text Rewards
 * 
 * @param QuestName
 * @text Quest Name
 * @parent QuestInfo
 * @type String
 * @default Quest1
 * @desc Set quest name.
 * 
 * @param QuestFlagID
 * @text Flag ID
 * @parent QuestInfo
 * @type number
 * @default 0
 * @desc This use Global Settings > Initial Settings > Quest Flag Settings ID. ID will be started from 0,1,2...etc
 * 
 * @param RootQuest
 * @text Root Quest
 * @parent QuestInfo
 * @type boolean
 * @on Root quest
 * @off Normal quest
 * @default false
 * @desc Root quest is the mode that player has to complete objectives one by one in the order of objectives list. 
 * 
 * @param QuestIconSetting
 * @text Quest Icon
 * @parent QuestInfo
 * @type struct<QuestIconSetup>
 * @desc This icon is used as it is for this quest icon.
 * 
 * @param QuestBoardID
 * @text Quest Board ID
 * @parent QuestInfo
 * @type number[]
 * @default ["0"]
 * @desc This will let the quest show in the list of quest board that has same quest board ID. *you can set multiple ID`s to show.
 * 
 * @param NpcOnly
 * @text NPC Only
 * @parent QuestInfo
 * @type boolean
 * @on NPC only
 * @off Not NPC only
 * @default false
 * @desc Select NPC only if you don't want to show on the quest board. this will only be able to assent from npc`s.
 * 
 * @param QuestCategory
 * @text Quest Filter Category
 * @parent QuestInfo
 * @type string[]
 * @default ["cat1"]
 * @desc Set Id as catId. this will use from Global Settings > Quest Menu Filter Category. *you can set multiple ID`s to select.
 * 
 * @param QuestDifficulty
 * @text Quest Difficulty
 * @parent QuestInfo
 * @type struct<QuestDifficultySetup>
 * @desc Setup quest difficulty
 * 
 * @param QuestClient
 * @text Client Information
 * @parent QuestInfo
 * @type struct<QuestClientSetup>
 * @desc Setup client information.
 * 
 * @param DailyQuest
 * @text Daily Quest
 * @parent QuestInfo
 * @type boolean
 * @on Daily quest
 * @off Normal quest
 * @default false
 * @desc This will read from pc and when it is 0 am then it reset automatically if assented/reported/failed(when failing).
 * 
 * @param AutoReport
 * @text Automatic Reporting
 * @parent QuestInfo
 * @type boolean
 * @on Auto Report
 * @off Need to Speak to Npc
 * @default false
 * @desc When it is true then it will automatically report when this quest is able to report.
 * 
 * @param QuestActivateSetup
 * @text Assenting Info
 * @parent QuestInfo
 * @type struct<QuestActivateSettings>
 * @desc This will activate when this quest is assented.
 * 
 * @param QuestCancelSetup
 * @text Deleting Info
 * @parent QuestInfo
 * @type struct<QuestCancelSettings>
 * @desc This will activate when this quest is deleted.
 * 
 * @param QuestClearedSetup
 * @text Reporting Info
 * @parent QuestInfo
 * @type struct<QuestClearedSettings>
 * @desc This will activate when this quest is reported.
 * 
 * @param QuestFailedSetup
 * @text Failing Info
 * @parent QuestInfo
 * @type struct<QuestFailedSettings>
 * @desc This will activate when this quest is failed.
 * 
 * @param ActorLevel
 * @text Actor Required Level
 * @parent QuestOrderConditions
 * @type struct<QuestOrderNeedActorLevel>[]
 * @desc The first character setting will act as leader actor. don't set anything if you not going to use actor required level.
 * 
 * @param NeedMembers
 * @text Required Members
 * @parent QuestOrderConditions
 * @type actor[]
 * @desc Required members setting to assent this quest. don't set anything if you not going to use required members.
 * 
 * @param OutMembers
 * @text Exclude Members
 * @parent QuestOrderConditions
 * @type actor[]
 * @desc Exclude members setting to assent this quest. don't set anything if you not going to use exclude members.
 * 
 * @param MaxMember
 * @text Max Member
 * @parent QuestOrderConditions
 * @type number
 * @default 0
 * @desc Setup max member if you want to use for assenting this quest. 0 is for no matter.
 * 
 * @param SwitchConditions
 * @text Required Switch Conditions
 * @parent QuestOrderConditions
 * @type struct<QuestNeedOrderSwSetup>[]
 * @desc Setup switch conditions if you want to use for assenting this quest.
 * 
 * @param ValConditions
 * @text Required Variable Conditions
 * @parent QuestOrderConditions
 * @type struct<QuestNeedOrderValSetup>[]
 * @desc Setup variable conditons if you want to use for assenting this quest.
 * 
 * @param NeedAssentedQuests
 * @text Required Assented Quests
 * @parent QuestOrderConditions
 * @type number[]
 * @min 1
 * @desc Setup required assented quests Id if you want to use for assenting this quest. *set only the number Id.
 * 
 * @param NeedClearedQuests
 * @text Required Reported Quests
 * @parent QuestOrderConditions
 * @type number[]
 * @min 1
 * @desc Setup required reported quests Id if you want to use for assenting this quest. *set only the number Id.
 * 
 * @param PlaceInformation
 * @text Quest Activity Area Name
 * @parent QuestInfos
 * @type string
 * @desc Setup activity area name for this quest.
 * 
 * @param QuestContent
 * @text Quest Summary
 * @parent QuestInfos
 * @type note
 * @desc Setup quest summary. you can use text control character.
 * 
 * @param QuestClearContent
 * @text Objective Completed Text
 * @parent QuestInfos
 * @type note
 * @desc This will be active when all the objectives are completed. don't set anything if you not going to use.
 * 
 * @param QuestRewardGold
 * @text Reward Gold
 * @parent QuestRewards
 * @type number
 * @default 0
 * @desc Setup gold reward. set 0 for not using.
 * 
 * @param QuestLoseGold
 * @text Reduce Gold
 * @parent QuestRewards
 * @type number
 * @default 0
 * @desc Setup reduce gold when rewarding. set 0 for not using.
 * 
 * @param QuestRewardExp
 * @text Reward Exp
 * @parent QuestRewards
 * @type number
 * @default 0
 * @desc Setup exp reward. set 0 for not using.
 * 
 * @param QuestLoseExp
 * @text Reduce Exp
 * @parent QuestRewards
 * @type number
 * @default 0
 * @desc Setup reduce exp when rewarding. set 0 for not using.
 * 
 * @param QuestRewardItem
 * @text Reward Items
 * @parent QuestRewards
 * @type struct<QuestRewardItems>[]
 * @desc Adding reward items. set one item by one.
 * 
 * @param QuestLoseItem
 * @text Reduce Items
 * @parent QuestRewards
 * @type struct<QuestLoseItems>[]
 * @desc Reducing items when rewarding. set one item by one.
 */

/*~struct~QuestFailedSettings:
 * @param FailedSelfSw
 * @text Self Switches For Failing
 * @type struct<QuestFailedSelfSwSetup>[]
 * @desc Setup self switches for case quest failed.
 * 
 * @param FailedSw
 * @text Switches For Failing
 * @type struct<QuestFailedSwSetup>[]
 * @desc Setup switches for case quest failed.
 * 
 * @param FailedVal
 * @text Variables For Failing
 * @type struct<QuestFailedValSetup>[]
 * @desc Setup variables for case quest failed.
 * 
 * @param FailedCommonEvent
 * @text Activate Common Event For Failing
 * @type common_event
 * @desc Setup common event to activate when quest is failed.
 */

/*~struct~QuestClearedSettings:
 * @param ClearedSelfSw
 * @text Self Switches For Reporting
 * @type struct<QuestClearedSelfSwSetup>[]
 * @desc Setup self switches for case quest reported.
 * 
 * @param ClearedSw
 * @text Switches For Reporting
 * @type struct<QuestClearedSwSetup>[]
 * @desc Setup switches for case quest reported.
 * 
 * @param ClearedVal
 * @text Variables For Reporting
 * @type struct<QuestClearedValSetup>[]
 * @desc Setup variables for case quest reported.
 * 
 * @param ClearedCommonEvent
 * @text Activate Common Event For Reporting
 * @type common_event
 * @desc Setup common event to activate when quest is reported.
 */

/*~struct~QuestLoseItems:
 * @param UseWitchItem
 * @text Item Type
 * @type select
 * @option Item
 * @value Item
 * @option Weapon
 * @value Weapon
 * @option Armor
 * @value Armor
 * @default Item
 * @desc Select reducing item type.
 * 
 * @param SelectedItem
 * @text Item ID
 * @type item
 * @desc Setup item id for case Item Type is Item.
 * 
 * @param SelectedWeapon
 * @text Weapon ID
 * @type weapon
 * @desc Setup weapon id for case Item Type is Weapon.
 * 
 * @param SelectedArmor
 * @text Armor ID
 * @type armor
 * @desc Setup armor id for case Item Type is Armor.
 * 
 * @param Amount
 * @text Reducing Amount
 * @type number
 * @desc Set reducing amount.
 */

/*~struct~QuestRewardItems:
 * @param UseWitchItem
 * @text Item Type
 * @type select
 * @option Item
 * @value Item
 * @option Weapon
 * @value Weapon
 * @option Armor
 * @value Armor
 * @default Item
 * @desc Select reward item type.
 * 
 * @param SelectedItem
 * @text Item ID
 * @type item
 * @desc Setup item id for case Item Type is Item.
 * 
 * @param SelectedWeapon
 * @text Weapon ID
 * @type weapon
 * @desc Setup weapon id for case Item Type is Weapon.
 * 
 * @param SelectedArmor
 * @text Armor ID
 * @type armor
 * @desc Setup armor id for case Item Type is Armor.
 * 
 * @param Amount
 * @text Reward Amount
 * @type number
 * @desc Set reward amount.
 */

/*~struct~QuestObjectiveData:
 * @param ObjectiveIcons
 * @text Objective Icons
 * @type struct<ObjectiveIconSetup>
 * @desc Setup Icon Index for objective conditions.
 * 
 * @param ObjectiveTypes
 * @text Objective Type
 * @type select
 * @option Quest Object
 * @value questobj
 * @option Kill
 * @value killquest
 * @option Variable
 * @value valquest
 * @option Item Possession
 * @value itemquest
 * @option Reported Quest
 * @value selectedquestcleared
 * @default questobj
 * @desc Select objective type from Quest Objective, Kill, Variable, Item Possession or Reported Quest.
 * 
 * @param ObjectiveID
 * @text Objective ID
 * @type struct<ObjectiveTargets>
 * @desc Objective Type: Kill > Enemy ID, Variable > Variable ID, Item Possession > Item Info, Reported Quest > Quest ID.
 * 
 * @param ObjectiveContent
 * @text Objective Summary
 * @type note
 * @default "write objective summary"
 * @desc Write simple summary. you can use text control character except font size changing and assuming up to 2 lines.
 * 
 * @param ObjectiveFinishAmount
 * @text Complete Progress Amount
 * @type number
 * @min 1
 * @desc Setup complete progress amount. but if Objective Type is Repored Quest then set only 1.
 * 
 * @param ClearCommonEvent
 * @text Common Event When Completed
 * @type common_event
 * @desc Setup common event to activate when this objective is completed.*this will only work once.
 */

/*~struct~ObjectiveTargets:
 * @param TargetEnemyID
 * @text Enemy ID
 * @type enemy
 * @desc Setup target enemy to kill. *this is not troop id.
 * 
 * @param TargetValID
 * @text Variable ID
 * @type variable
 * @desc Setup variable Id to compare with complete progress amount.
 * 
 * @param TargetItemID
 * @text Item Info
 * @type struct<TargetItemSetup>
 * @desc Setup one item info for one objective.
 * 
 * @param TargetQuestID
 * @text Quest ID
 * @type number
 * @min 1
 * @desc Setup quest Id to check if it is reported. *set only number Id.
 */

/*~struct~TargetItemSetup:
 * @param UseWitchItem
 * @text Item Type
 * @type select
 * @option Item
 * @value Item
 * @option Weapon
 * @value Weapon
 * @option Armor
 * @value Armor
 * @default Item
 * @desc Select possession item type.
 * 
 * @param SelectedItem
 * @text Item ID
 * @type item
 * @desc Setup item id for case Item Type is Item.
 * 
 * @param SelectedWeapon
 * @text Weapon ID
 * @type weapon
 * @desc Setup weapon id for case Item Type is Weapon.
 * 
 * @param SelectedArmor
 * @text Armor ID
 * @type armor
 * @desc Setup armor id for case Item Type is Armor.
 */

/*~struct~ObjectiveIconSetup:
 * @param ObjectiveActivatedIcon
 * @text Active Icon
 * @type number
 * @min -1
 * @default 67
 * @desc Icon for condition active. set -1 to not to use icon. you can open icon list from text tab then right click.
 * 
 * @param ObjectiveClearedIcon
 * @text Completed Icon
 * @type number
 * @min -1
 * @default 72
 * @desc Icon for condition completed. set -1 to not to use icon. you can open icon list from text tab then right click.
 * 
 * @param ObjectiveFailedIcon
 * @text Failed Icon
 * @type number
 * @min -1
 * @default 1
 * @desc Icon for condition failed. set -1 to not to use icon. you can open icon list from text tab then right click.
 */

/*~struct~QuestNeedOrderValSetup:
 * @param Val
 * @text Variable
 * @type variable
 * @default 1
 * @desc Setup variable to compare.
 * 
 * @param ValCondition
 * @text Condition
 * @type select
 * @option above
 * @value mt
 * @option greater than or equal to
 * @value imt
 * @option less than
 * @value lt
 * @option less than or equal to
 * @value ilt
 * @option equal to
 * @value just
 * @option case words equal to
 * @value stringcheck
 * @default stringcheck
 * @desc Setup condition to check the variable. *if you are going to use words then make sure to use case words equal to.
 * 
 * @param ValValue
 * @text Value
 * @type string
 * @desc Value to compare. if you are going to compare with words then use ''(Single quote).
 */

/*~struct~QuestNeedOrderSwSetup:
 * @param SwID
 * @text Switch ID
 * @type switch
 * @default 1
 * @desc Setup Switch to compare.
 * 
 * @param SwBoolean
 * @text Condition
 * @type boolean
 * @desc Set condition true/false to compare.
 */

/*~struct~QuestOrderNeedActorLevel:
 * @param Actor
 * @text Actor
 * @type actor
 * @desc Select actor.
 * 
 * @param ActorLevel
 * @text Required Level
 * @type number
 * @min 1
 * @default 1
 * @desc Set required level of the actor.
 */

/*~struct~QuestCancelSettings:
 * @param CancelLock
 * @text Can Delete Quest
 * @type boolean
 * @on Deletion prohibited
 * @off Can be deleted
 * @default false
 * @desc Select if this quest is able to delete by player.
 * 
 * @param CancelSelfSw
 * @text Self Switches For Deleting
 * @type struct<QuestCancelSelfSwSetup>[]
 * @desc Setup self switches for case quest deleted.
 * 
 * @param CancelSw
 * @text Switches For Deleting
 * @type struct<QuestCancelSwSetup>[]
 * @desc Setup switches for case quest deleted.
 * 
 * @param CancelVal
 * @text Variable For Deleting
 * @type struct<QuestCancelValSetup>[]
 * @desc Setup variable for case quest deleted.
 */

/*~struct~QuestActivateSettings:
 * @param AutoAddQuests
 * @text Auto Add Quest 'Family Quests'
 * @type number[]
 * @min 1
 * @desc Setup auto adding quests. *set only the number Id. *the quest that is setted here will always iqnore requirement.
 * 
 * @param ActivateSelfSw
 * @text Self Switches For Assenting
 * @type struct<QuestActivateSelfSwSetup>[]
 * @desc Setup self switches for case quest assented.
 * 
 * @param ActivateSw
 * @text Switches For Assenting
 * @type struct<QuestActivateSwSetup>[]
 * @desc Setup switches for case quest assented.
 * 
 * @param ActivateVal
 * @text Variable For Assenting
 * @type struct<QuestActivateValSetup>[]
 * @desc Setup variables for case quest assented.
 */

/*~struct~QuestActivateValSetup:
 * @param ActivateVal
 * @text Variable
 * @type variable
 * @default 1
 * @desc Setup variable to change value.
 * 
 * @param ValCondition
 * @text Condition
 * @type select
 * @option Add
 * @value add
 * @option Subtract
 * @value sub
 * @option Insert
 * @value ins
 * @default ins
 * @desc Setup condition to change the variable value. *if you are going to use words then make sure to use insert.
 * 
 * @param ValValue
 * @text Value
 * @type string
 * @desc Value to use. if you are going to change with words then use ''(Single quote).
 */

/*~struct~QuestCancelValSetup:
 * @param ActivateVal
 * @text Variable
 * @type variable
 * @default 1
 * @desc Setup variable to change value.
 * 
 * @param ValCondition
 * @text Condition
 * @type select
 * @option Add
 * @value add
 * @option Subtract
 * @value sub
 * @option Insert
 * @value ins
 * @default ins
 * @desc Setup condition to change the variable value. *if you are going to use words then make sure to use insert.
 * 
 * @param ValValue
 * @text Value
 * @type string
 * @desc Value to use. if you are going to change with words then use ''(Single quote).
 */

/*~struct~QuestFailedValSetup:
 * @param ActivateVal
 * @text Variable
 * @type variable
 * @default 1
 * @desc Setup variable to change value.
 * 
 * @param ValCondition
 * @text Condition
 * @type select
 * @option Add
 * @value add
 * @option Subtract
 * @value sub
 * @option Insert
 * @value ins
 * @default ins
 * @desc Setup condition to change the variable value. *if you are going to use words then make sure to use insert.
 * 
 * @param ValValue
 * @text Value
 * @type string
 * @desc Value to use. if you are going to change with words then use ''(Single quote).
 */

/*~struct~QuestClearedValSetup:
 * @param ActivateVal
 * @text Variable
 * @type variable
 * @default 1
 * @desc Setup variable to change value.
 * 
 * @param ValCondition
 * @text Condition
 * @type select
 * @option Add
 * @value add
 * @option Subtract
 * @value sub
 * @option Insert
 * @value ins
 * @default ins
 * @desc Setup condition to change the variable value. *if you are going to use words then make sure to use insert.
 * 
 * @param ValValue
 * @text Value
 * @type string
 * @desc Value to use. if you are going to change with words then use ''(Single quote).
 */

/*~struct~QuestActivateSwSetup:
 * @param ActivateSwID
 * @text Switch ID
 * @type switch
 * @default 1
 * @desc Select Switch to change condition.
 * 
 * @param SwBoolean
 * @text Condition
 * @type boolean
 * @desc Set true/false for the current switch.
 */

/*~struct~QuestCancelSwSetup:
 * @param ActivateSwID
 * @text Switch ID
 * @type switch
 * @default 1
 * @desc Select Switch to change condition.
 * 
 * @param SwBoolean
 * @text Condition
 * @type boolean
 * @desc Set true/false for the current switch.
 */

/*~struct~QuestFailedSwSetup:
 * @param ActivateSwID
 * @text Switch ID
 * @type switch
 * @default 1
 * @desc Select Switch to change condition.
 * 
 * @param SwBoolean
 * @text Condition
 * @type boolean
 * @desc Set true/false for the current switch.
 */

/*~struct~QuestClearedSwSetup:
 * @param ActivateSwID
 * @text Switch ID
 * @type switch
 * @default 1
 * @desc Select Switch to change condition.
 * 
 * @param SwBoolean
 * @text Condition
 * @type boolean
 * @desc Set true/false for the current switch.
 */

/*~struct~QuestActivateSelfSwSetup:
 * @param MapID
 * @text Map ID
 * @type number
 * @desc Set map id that has the event you are going to change.
 * 
 * @param EventID
 * @text Event ID
 * @type number
 * @desc Set event id of the event you are going to change.
 * 
 * @param SwitchType
 * @text Switch Type
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @default A
 * @desc Select from A to D that you are going to use.
 * 
 * @param SelfSwBoolean
 * @text Switch Condition
 * @type boolean
 * @desc Set true/false for the current self switch.
 */

/*~struct~QuestCancelSelfSwSetup:
 * @param MapID
 * @text Map ID
 * @type number
 * @desc Set map id that has the event you are going to change.
 * 
 * @param EventID
 * @text Event ID
 * @type number
 * @desc Set event id of the event you are going to change.
 * 
 * @param SwitchType
 * @text Switch Type
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @default A
 * @desc Select from A to D that you are going to use.
 * 
 * @param SelfSwBoolean
 * @text Switch Condition
 * @type boolean
 * @desc Set true/false for the current self switch.
 */

/*~struct~QuestFailedSelfSwSetup:
 * @param MapID
 * @text Map ID
 * @type number
 * @desc Set map id that has the event you are going to change.
 * 
 * @param EventID
 * @text Event ID
 * @type number
 * @desc Set event id of the event you are going to change.
 * 
 * @param SwitchType
 * @text Switch Type
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @default A
 * @desc Select from A to D that you are going to use.
 * 
 * @param SelfSwBoolean
 * @text Switch Condition
 * @type boolean
 * @desc Set true/false for the current self switch.
 */

/*~struct~QuestClearedSelfSwSetup:
 * @param MapID
 * @text Map ID
 * @type number
 * @desc Set map id that has the event you are going to change.
 * 
 * @param EventID
 * @text Event ID
 * @type number
 * @desc Set event id of the event you are going to change.
 * 
 * @param SwitchType
 * @text Switch Type
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @default A
 * @desc Select from A to D that you are going to use.
 * 
 * @param SelfSwBoolean
 * @text Switch Condition
 * @type boolean
 * @desc Set true/false for the current self switch.
 */

/*~struct~QuestClientSetup:
 * @param QuestClientName
 * @text Client Name
 * @type string
 * @desc Set client name.
 * 
 * @param QuestLocation
 * @text Client Location
 * @type string
 * @desc Set client location.
 * 
 * @param QuestClientSprite
 * @text Client Character Walking Graphic
 * @type struct<QuestClientSpriteSetup>
 * @desc Setup client character walking graphic.
 * 
 * @param QuestClientPicture
 * @text Client Character Img
 * @type struct<QuestClientPictureSetup>
 * @desc You can add img to react as walking graphic.
 */

/*~struct~QuestClientSpriteSetup:
 * @param SpriteName
 * @text Walking Graphic Name
 * @type file
 * @dir img/characters/
 * @default Actor1
 * @desc Select walking graphic
 * 
 * @param SpriteIndex
 * @text Index
 * @type number
 * @default 0
 * @desc Set index number of the walking graphic.
 * 
 * @param SpriteX
 * @text Walking Graphic X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust walking graphic x coordinate.
 * 
 * @param SpriteY
 * @text Walking Graphic Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust walking graphic y coordinate.
 */

/*~struct~QuestClientPictureSetup:
 * @param UsePicture
 * @text Use Img?
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc Setup if you want to use walking graphic img.
 * 
 * @param PictureFile
 * @text Img File
 * @type file
 * @dir img/quests
 * @desc Select img file.
 * 
 * @param PictureX
 * @text Img X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from original walking graphic x coordinate.
 * 
 * @param PictureY
 * @text Img Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from original walking graphic y coordinate.
 * 
 * @param PictureOpacity
 * @text Img Opacity
 * @type number
 * @default 255
 * @desc Img opacity. 0:255
 * 
 * @param PictureAnchor
 * @text Use Anchor
 * @type boolean
 * @on Use
 * @off Don't use
 * @default false
 * @desc If you want to use x and y coordinate to set as in middle of the img then select use. else top left is the coordinate.
 */

/*~struct~QuestDifficultySetup:
 * @param DifficultyText
 * @text Difficulty Text
 * @type string
 * @desc You can change text color at Global Settings > Quest Info Settings > Difficulty Settings. 
 * 
 * @param TextX
 * @text Text X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from original difficulty text x coordinate.
 * 
 * @param TextY
 * @text Text Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from original difficulty text y coordinate.
 * 
 * @param IconsetID
 * @text Difficulty IconPack ID
 * @type number
 * @min -1
 * @default 0
 * @desc GlobalSettings > QuestInfoSettings > DifficultySettings > DifficultyIconPackId. ID:start as 0,1..etc. -1 to not use.
 */

/*~struct~QuestIconSetup:
 * @param QuestIconID
 * @text Icon Index
 * @type number
 * @min -1
 * @default -1
 * @desc Select icon index for this quest. -1 to not use. you can open icon list from text tab then right click.
 * 
 * @param QuestIconX
 * @text Icon X Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust x coordinate from original icon x coordinate.
 * 
 * @param QuestIconY
 * @text Icon Y Coordinate
 * @type number
 * @min -999999999999999
 * @default 0
 * @desc Adjust y coordinate from original icon y coordinate.
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
var AyatamQuestSystemName = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];

//プラグインパラメータを登録
Ayatam.QUEST.Parameters = PluginManager.parameters(AyatamQuestSystemName);
//プラグインパラメータの文字列を配列に変換
Ayatam.QUEST.Parameters = JSON.parse(JSON.stringify(Ayatam.QUEST.Parameters,(key,value)=>{
    try{return JSON.parse(value);} catch (e) {}
    return value;
    }
));
//基本設定のショートカット
Ayatam.QUEST.GlobalSettings = Ayatam.QUEST.Parameters.GlobalSettings;
//カスタマイズ設定のショートカット
Ayatam.QUEST.CustamizeSettings = Ayatam.QUEST.Parameters.CustamizeSettings;
//データベースのショートカット
Ayatam.QUEST.QuestDatabase = Ayatam.QUEST.Parameters.QuestDatabase;
//クエスト用のキャッシュ
Ayatam.QUEST.imgCashes = [];
//クエストリフレッシュ
Ayatam.QUEST.needsRefresh = false;

//Game_Questの定義
var $gameQuest = null;

//キーマッピングにキーを登録
//Input.keyMapper[CodeId] = 'CallKey';
//CodeId : キー番号
//CallKey : 呼び出し名 ''(シングルクォートで指定)
//【例】Aのキーコードは65なので、Input.keyMapper[65] = 'A'
//【例】Input.isTriggered('A') でAを判定させることが可能になります。
//※追加する際の注意、js/rpg_core.js の Input.keyMapper に予め登録されているキーがあるので、
//  登録されていないキーのみ登録します。コアverごとで変更がある可能性があるので追加前に確認推奨。
//=============================================================================
//キーリスト「アルファベット」      [数字]                [テンキー数字]
//  A => 65   K => 75   U => 85  |  0 => 48   6 => 54  |  T0 => 96   T6 => 102
//  B => 66   L => 76   V => 86  |  1 => 49   7 => 55  |  T1 => 97   T7 => 103
//  C => 67   M => 77   W => 87  |  2 => 50   8 => 56  |  T2 => 98   T8 => 104
//  D => 68   N => 78   X => 88  |  3 => 51   9 => 57  |  T3 => 99   T9 => 105
//  E => 69   O => 79   Y => 89  |  4 => 52            |  T4 => 100  
//  F => 70   P => 80   Z => 90  |  5 => 53            |  T5 => 101  
//  G => 71   Q => 81            |                     |
//  H => 72   R => 82            |                     |
//  I => 73   S => 83            |                     |
//  J => 74   T => 84            |                     |
//-----------------------------------------------------------------------------
//キーリスト「記号」                 [テンキー記号]   [ファンクションキー]
//  :* => 186   ^~ => 222   U => 85  |  T* => 106  |  F1 => 112   F7 => 118
//  ;+ => 187   ¥_ => 226   V => 86  |  T+ => 107  |  F2 => 113   F8 => 119
//  ,< => 188                        |  T- => 109  |  F3 => 114   F9 => 120
//  -= => 189                        |  T. => 110  |  F4 => 115   F10 => 121
//  .> => 190                        |  T/ => 111  |  F5 => 116   F11 => 122
//  /? => 191                        |             |  F6 => 117   F12 => 123
//  @` => 192                        |             |
//  [{ => 219                        |             |
//  ¥| => 220                        |             |
//  ]} => 221                        |             |
//-----------------------------------------------------------------------------
//キーリスト「制御キー」
//  BackSpace      => 8    PageUp   => 33   Win               => 91
//  NumLockOFFのT5 => 12   PageDown => 34   Apps              => 93
//  Enter/TEnter   => 13   End      => 35   NumLock           => 144
//  Shift          => 16   Home     => 36   ScrollLock        => 145
//  Ctrl           => 17   ←        => 37   英数              => 240
//  Alt            => 18   ↑        => 38   カタカナ/ひらがな => 242
//  Pause          => 19   →        => 39   Esc               => 243
//  変換           => 28   ↓        => 40   半角/全角         => 244
//  無変換         => 29   Insert   => 45   Tab               => 9
//  スペース       => 32   Delete   => 46
//=============================================================================

//ゲームパッドキーマッピングにキーを登録
//Input.gamepadMapper[CodeId] = 'CallKey';
//CodeId : キー番号
//CallKey : 呼び出し名 ''(シングルクォートで指定)
//【例】LBのキーコードは4なので、Input.gamepadMapper[4] = 'pageup'
//【例】Input.isTriggered('pageup') でLBを判定させることが可能になります。
//※追加する際の注意、js/rpg_core.js の Input.gamepadMapper に予め登録されているキーがあるので、
//  登録されていないキーのみ登録します。コアverごとで変更がある可能性があるので追加前に確認推奨。
//=============================================================================
//キーリスト「ゲームパッドキー」
//  A     => 0    L3 => 10
//  B     => 1    R3 => 11
//  X     => 2    ←  => 12
//  Y     => 3    ↑  => 13
//  LB    => 4    →  => 14
//  RB    => 5    ↓  => 15
//  LT    => 6   
//  RT    => 7   
//  back  => 8   
//  start => 9   
//=============================================================================

//=============================================================================
// Ayatam.QUEST - スクリプトコマンド
//=============================================================================

//=============================================================================
// 画面系
//=============================================================================
// ● クエストメニューを開く
//--------------------------------------------------------------------------
Ayatam.QUEST.openQuestMenu = function() {
    if(!$gameQuest.canOpenQuestMenu()) return;
    SceneManager.push(Scene_QuestMenu);
};
//--------------------------------------------------------------------------
// ● クエストボードを開く
//--------------------------------------------------------------------------
Ayatam.QUEST.openQuestBoard = function(id,name,list,mode) {
    if(SceneManager._scene.constructor !== Scene_Map) return;
    SceneManager._scene.questBoard(id,name,list,mode);
    $gameQuest.setFiberYield(true);
};

//=============================================================================
// クエスト受注系
//=============================================================================
// ● クエストの受注条件を表示する
//--------------------------------------------------------------------------
Ayatam.QUEST.showCheckQuest = function(questId,mode = false) {
    if(SceneManager._scene.constructor !== Scene_Map) return;
    if($gameQuest.findQuest(questId) === false) return;
    if($gameQuest.isAssented(questId)) return;
    SceneManager._scene.showCheckQuest(questId,mode)
    $gameQuest.setFiberYield(true);
};
//--------------------------------------------------------------------------
// ● クエストの受注条件補助コマンド
//--------------------------------------------------------------------------
Ayatam.QUEST.showCheckChoice = function() {
    return $gameQuest.showCheckQuestChoice();
};
//--------------------------------------------------------------------------
// ● クエストを受注するか問う
//--------------------------------------------------------------------------
Ayatam.QUEST.showQuest = function(questId) {
    if(SceneManager._scene.constructor !== Scene_Map) return;
    if($gameQuest.findQuest(questId) === false) return;
    if($gameQuest.isAssented(questId)) return;
    SceneManager._scene.showQuest(questId);
    $gameQuest.setFiberYield(true);
};
//--------------------------------------------------------------------------
// ● クエストの受注条件に問わず受注
//--------------------------------------------------------------------------
Ayatam.QUEST.forceAssent = function(questId) {
    if(SceneManager._scene.constructor !== Scene_Map) return;
    if($gameQuest.isAssented(questId)) return;
    $gameQuest.questAssent(questId);
};
//--------------------------------------------------------------------------
// ● クエストの報告するかを問う
//--------------------------------------------------------------------------
Ayatam.QUEST.reportQuest = function(questId) {
    if(SceneManager._scene.constructor !== Scene_Map) return;
    if(!$gameQuest.isAssented(questId)) return;
    if($gameQuest.isFailed(questId)) return;
    if($gameQuest.isReported(questId)) return;
    SceneManager._scene.reportQuest(questId);
    $gameQuest.setFiberYield(true);
};
//--------------------------------------------------------------------------
// ● 有無を問わず報告する
//--------------------------------------------------------------------------
Ayatam.QUEST.forceReportQuest = function(questId) {
    if(SceneManager._scene.constructor !== Scene_Map) return;
    if(!$gameQuest.isAssented(questId)) return;
    if($gameQuest.isFailed(questId)) return;
    if($gameQuest.isReported(questId)) return;
    $gameQuest.questReport(questId);
};
//--------------------------------------------------------------------------
// ● 受注しているクエストを失敗させる
//--------------------------------------------------------------------------
Ayatam.QUEST.failQuest = function(questId) {
    if(!$gameQuest.canFail(questId)) return;
    $gameQuest.questFail(questId);
};
//--------------------------------------------------------------------------
// ● 受注しているクエストに限り、初期化
//--------------------------------------------------------------------------
Ayatam.QUEST.resetQuest = function(questId) {
    $gameQuest.resetQuest(questId);
};
//--------------------------------------------------------------------------
// ● すべてのクエストを受注する「デバッグ用」
//--------------------------------------------------------------------------
Ayatam.QUEST.getAllQuest = function() {
    $gameQuest.assentAllQuest();
};
//--------------------------------------------------------------------------
// ● 受注しているすべてのクエストを初期化
//--------------------------------------------------------------------------
Ayatam.QUEST.resetAllQuest = function() {
    $gameQuest.resetAllQuest();
};

//=============================================================================
// ナビゲーター系
//=============================================================================
// ● ナビゲーターの表示する「クエストが設定されている場合のみ」
//--------------------------------------------------------------------------
Ayatam.QUEST.showQuestNavi = function() {
    if(Ayatam.QUEST.GlobalSettings.NoNaviQuestMode) return;
    if(SceneManager._scene.constructor !== Scene_Map) return;
    if(!$gameQuest.questInNavi()) return;
    SceneManager._scene.showQuestNav();
};
//--------------------------------------------------------------------------
// ● ナビゲーターの非表示にする「クエストが設定されている場合のみ」
//--------------------------------------------------------------------------
Ayatam.QUEST.hideQuestNavi = function() {
    if(Ayatam.QUEST.GlobalSettings.NoNaviQuestMode) return;
    if(SceneManager._scene.constructor !== Scene_Map) return;
    if(!$gameQuest.questInNavi()) return;
    SceneManager._scene.hideQuestNav();
};

//=============================================================================
// 「questObj」 - クエスト進行系 -
//=============================================================================
// ● クエストのスクリプトコマンドオブジェクト 「代入」
//--------------------------------------------------------------------------
Ayatam.QUEST.insObj = function(questId,setId,amount) {
    $gameQuest.questInsObj(questId,setId,amount);
    if(SceneManager._scene.constructor !== Scene_Map) return;
    SceneManager._scene.QuestNavNeedRefresh();
};
//--------------------------------------------------------------------------
// ● クエストのスクリプトコマンドオブジェクト 「加算」
//--------------------------------------------------------------------------
Ayatam.QUEST.addObj = function(questId,setId,amount) {
    $gameQuest.questAddObj(questId,setId,amount);
    if(SceneManager._scene.constructor !== Scene_Map) return;
    SceneManager._scene.QuestNavNeedRefresh();
};
//--------------------------------------------------------------------------
// ● クエストのスクリプトコマンドオブジェクト 「減算」
//--------------------------------------------------------------------------
Ayatam.QUEST.subObj = function(questId,setId,amount) {
    $gameQuest.questSubObj(questId,setId,amount);
    if(SceneManager._scene.constructor !== Scene_Map) return;
    SceneManager._scene.QuestNavNeedRefresh();
};
//--------------------------------------------------------------------------
// ● クエストのスクリプトコマンドオブジェクト 「条件:達成状況を求める」
//--------------------------------------------------------------------------
Ayatam.QUEST.questObj = function(questId,setId) {
    return $gameQuest.getObjectiveAmount(questId,setId);
};
//--------------------------------------------------------------------------
// ● クエストのスクリプトコマンドオブジェクト 「クリア目的数を変更」
//--------------------------------------------------------------------------
Ayatam.QUEST.objChangeClearAmount = function(questId,setId,amount) {
    $gameQuest.findQuest(questId).getObjective(setId).changeClearAmount(amount);
};

//=============================================================================
// ImageManager - クエストシステム専用画像フォルダ
//=============================================================================
ImageManager.loadQuests = function(filename, hue) {
    return this.loadBitmap('img/quests/', filename, hue, true);
};

//=============================================================================
// Game_Quest - クエストオブジェクト
//=============================================================================

class Game_Quest {
    constructor() {
        this.initialize.apply(this, arguments);
    }
    //--------------------------------------------------------------------------
    // ● オブジェクト初期化
    //--------------------------------------------------------------------------
    initialize() {
        this._data = null;
        this._questData = null;
        this._globalSettings = Ayatam.QUEST.GlobalSettings;
        this._showCheckQuestChoice = false;
        this._fiberYield = false;
        this.setupKeyMappings();
        this.setupGlobalSettings();
        this.initializeCashes();
        this.createCustamizeCashes();
        this.setupQuestData();
    }
    //--------------------------------------------------------------------------
    // ● クエストキャッシュデータの初期化
    //--------------------------------------------------------------------------
    initializeCashes() {
        Ayatam.QUEST.imgCashes['characters'] = [];
        Ayatam.QUEST.imgCashes['Quests'] = [];
    }
    //--------------------------------------------------------------------------
    // ● Ruby の Fiber.yield の状態設定
    //--------------------------------------------------------------------------
    setFiberYield(boolean) {
        this._fiberYield = boolean;
    }
    //--------------------------------------------------------------------------
    // ● Ruby の Fiber.yield の参照
    //--------------------------------------------------------------------------
    fiberYield() {
        return this._fiberYield;
    }
    //--------------------------------------------------------------------------
    // ● キーマッピングへ登録
    //--------------------------------------------------------------------------
    setupKeyMappings() {
        this.setupGamePadKeyMappings();
        this.setupKeyBoardKeyMappings();
    }
    //--------------------------------------------------------------------------
    // ● ゲームパッドキーマッピングへ登録
    //--------------------------------------------------------------------------
    setupGamePadKeyMappings() {
        var GlobalSettings = this._globalSettings;
        var QuestMenuPadCancelKey = GlobalSettings.QuestMenuPadCancelKey;
        var QuestMenuPadFilterKey = GlobalSettings.QuestMenuPadFilterKey;
        var QuestMenuPadNaviKey = GlobalSettings.QuestMenuPadNaviKey;
        var QuestNaviPadMapSceneKey = GlobalSettings.QuestNaviMapSceneKey.MapScenePadKey;
        var AllNewKeys = [QuestMenuPadCancelKey,QuestMenuPadFilterKey,QuestMenuPadNaviKey,QuestNaviPadMapSceneKey];
        AllNewKeys.forEach(key => {
            if(key !== "") {
                switch (key){
                    case 'ok':
                        if(Input.gamepadMapper[0] === undefined) Input.gamepadMapper[0] = key;
                        break;
                    case 'cancel':
                        if(Input.gamepadMapper[1] === undefined) Input.gamepadMapper[1] = key;
                        break;
                    case 'shift':
                        if(Input.gamepadMapper[2] === undefined) Input.gamepadMapper[2] = key;
                        break;
                    case 'menu':
                        if(Input.gamepadMapper[3] === undefined) Input.gamepadMapper[3] = key;
                        break;
                    case 'pageup':
                        if(Input.gamepadMapper[4] === undefined) Input.gamepadMapper[4] = key;
                        break;
                    case 'pagedown':
                        if(Input.gamepadMapper[5] === undefined) Input.gamepadMapper[5] = key;
                        break;
                    case 'lt':
                        if(Input.gamepadMapper[6] === undefined) Input.gamepadMapper[6] = key;
                        break;
                    case 'rt':
                        if(Input.gamepadMapper[7] === undefined) Input.gamepadMapper[7] = key;
                        break;
                    case 'back':
                        if(Input.gamepadMapper[8] === undefined) Input.gamepadMapper[8] = key;
                        break;
                    case 'start':
                        if(Input.gamepadMapper[9] === undefined) Input.gamepadMapper[9] = key;
                        break;
                    case 'l3':
                        if(Input.gamepadMapper[10] === undefined) Input.gamepadMapper[10] = key;
                        break;
                    case 'r3':
                        if(Input.gamepadMapper[11] === undefined) Input.gamepadMapper[11] = key;
                        break;
                    case 'up':
                        if(Input.gamepadMapper[12] === undefined) Input.gamepadMapper[12] = key;
                        break;
                    case 'down':
                        if(Input.gamepadMapper[13] === undefined) Input.gamepadMapper[13] = key;
                        break;
                    case 'left':
                        if(Input.gamepadMapper[14] === undefined) Input.gamepadMapper[14] = key;
                        break;
                    case 'right':
                        if(Input.gamepadMapper[15] === undefined) Input.gamepadMapper[15] = key;
                        break;
                }
            };
        });
    }
    //--------------------------------------------------------------------------
    // ● キーボードキーマッピングへ登録
    //--------------------------------------------------------------------------
    setupKeyBoardKeyMappings() {
        var GlobalSettings = this._globalSettings;
        var QuestMenuCancelKey = GlobalSettings.QuestMenuCancelKey;
        var QuestMenuFilterKey = GlobalSettings.QuestMenuFilterKey;
        var QuestMenuNaviKey = GlobalSettings.QuestMenuNaviKey;
        var QuestDataPageUpKey = GlobalSettings.QuestDataPageKey.PageUpKey;
        var QuestDataPageDownKey = GlobalSettings.QuestDataPageKey.PageDownKey;
        var QuestNaviMapSceneKey = GlobalSettings.QuestNaviMapSceneKey.MapSceneKey;
        var AllNewKeys = [QuestMenuCancelKey,QuestMenuFilterKey,QuestMenuNaviKey,QuestDataPageUpKey,QuestDataPageDownKey,QuestNaviMapSceneKey];
        AllNewKeys.forEach(key => {
            if(key !== "") {
                switch (key){
                    case 'A':
                        if(Input.keyMapper[65] === undefined) Input.keyMapper[65] = key;
                        break;
                    case 'B':
                        if(Input.keyMapper[66] === undefined) Input.keyMapper[66] = key;
                        break;
                    case 'C':
                        if(Input.keyMapper[67] === undefined) Input.keyMapper[67] = key;
                        break;
                    case 'D':
                        if(Input.keyMapper[68] === undefined) Input.keyMapper[68] = key;
                        break;
                    case 'E':
                        if(Input.keyMapper[69] === undefined) Input.keyMapper[69] = key;
                        break;
                    case 'F':
                        if(Input.keyMapper[70] === undefined) Input.keyMapper[70] = key;
                        break;
                    case 'G':
                        if(Input.keyMapper[71] === undefined) Input.keyMapper[71] = key;
                        break;
                    case 'H':
                        if(Input.keyMapper[72] === undefined) Input.keyMapper[72] = key;
                        break;
                    case 'I':
                        if(Input.keyMapper[73] === undefined) Input.keyMapper[73] = key;
                        break;
                    case 'J':
                        if(Input.keyMapper[74] === undefined) Input.keyMapper[74] = key;
                        break;
                    case 'K':
                        if(Input.keyMapper[75] === undefined) Input.keyMapper[75] = key;
                        break;
                    case 'L':
                        if(Input.keyMapper[76] === undefined) Input.keyMapper[76] = key;
                        break;
                    case 'M':
                        if(Input.keyMapper[77] === undefined) Input.keyMapper[77] = key;
                        break;
                    case 'N':
                        if(Input.keyMapper[78] === undefined) Input.keyMapper[78] = key;
                        break;
                    case 'O':
                        if(Input.keyMapper[79] === undefined) Input.keyMapper[79] = key;
                        break;
                    case 'P':
                        if(Input.keyMapper[80] === undefined) Input.keyMapper[80] = key;
                        break;
                    case 'pageup'://Q
                        if(Input.keyMapper[81] === undefined) Input.keyMapper[81] = key;
                        break;
                    case 'R':
                        if(Input.keyMapper[82] === undefined) Input.keyMapper[82] = key;
                        break;
                    case 'S':
                        if(Input.keyMapper[83] === undefined) Input.keyMapper[83] = key;
                        break;
                    case 'T':
                        if(Input.keyMapper[84] === undefined) Input.keyMapper[84] = key;
                        break;
                    case 'U':
                        if(Input.keyMapper[85] === undefined) Input.keyMapper[85] = key;
                        break;
                    case 'V':
                        if(Input.keyMapper[86] === undefined) Input.keyMapper[86] = key;
                        break;
                    case 'pagedown'://W
                        if(Input.keyMapper[87] === undefined) Input.keyMapper[87] = key;
                        break;
                    case 'Y':
                        if(Input.keyMapper[89] === undefined) Input.keyMapper[89] = key;
                        break;
                }
            };
        });
    }
    //--------------------------------------------------------------------------
    // ● 基本設定データの検査
    //--------------------------------------------------------------------------
    checkGlobalSettings(global) {
        if(global.FailingQuestMode === "") global.FailingQuestMode = false;
        if(global.NoNaviQuestMode === "") global.NoNaviQuestMode = false;
        if(global.ShowQuestLevelUp === "") global.ShowQuestLevelUp = true;
        if(global.QuestAssentedSoundData === "") global.QuestAssentedSoundData = null;
        if(global.QuestGetSoundData === "") global.QuestGetSoundData = null;
        if(global.QuestLostSoundData === "") global.QuestLostSoundData = null;
        if(global.QuestObjClearSoundData === "") global.QuestObjClearSoundData = null;
        if(global.QuestReportSoundData === "") global.QuestReportSoundData = null;
        if(global.QuestFailedSoundData === "") global.QuestFailedSoundData = null;
        return global;
    }
    //--------------------------------------------------------------------------
    // ● 基本設定のセットアップ
    //--------------------------------------------------------------------------
    setupGlobalSettings() {
        var global = this.checkGlobalSettings(this._globalSettings);
        this._questMode = this._questMode || {};
        this._questMode.failing = global.FailingQuestMode;
        this._questMode.noUseNavi = global.NoNaviQuestMode;
        this._questMode.showLevelUp = global.ShowQuestLevelUp;
        this._questSounds = this._questSounds || {};
        this._questSounds.assentSound = global.QuestAssentedSoundData;
        this._questSounds.getSound = global.QuestGetSoundData;
        this._questSounds.lostSound = global.QuestLostSoundData;
        this._questSounds.objClearSound = global.QuestObjClearSoundData;
        this._questMeSounds = this._questMeSounds || {};
        this._questMeSounds.reportSound = global.QuestReportSoundData;
        this._questMeSounds.failedSound = global.QuestFailedSoundData;
    }
    //--------------------------------------------------------------------------
    // ● クエストデータ作成
    //--------------------------------------------------------------------------
    setupQuestData() {
        var questData = Ayatam.QUEST.QuestDatabase;
        if(questData.length === 0) {
            console.error('高機能クエストシステム MV : Error :\nクエストのデータベースが空っぽです。最低1つクエストを作成してください。\nQuest database is empty. please create at least one quest.');
            require('nw.gui').Window.get().showDevTools();
            AudioManager.playSe({ "name": "Computer", "volume": 70, "pitch": 100, "pan": 0 });
            return
        };
        this._questData = [null];
        this._data = [null];
        for (var id = 0; id < questData.length; ++id) {
            this._questData['quest' + (id + 1)] = new Quest_Data(id + 1, 'quest' + (id + 1), questData[id]);
            this.createQuestCashes(this._questData['quest' + (id + 1)]);
        };
        for(var id = 0; id < questData.length; ++id) {
            this._data[this._questData['quest' + (id + 1)].questId()] = [];
            this._data[this._questData['quest' + (id + 1)].questId()]['assent'] = false;
            this._data[this._questData['quest' + (id + 1)].questId()]['reported'] = false;
            if(this._questMode.failing) {
                this._data[this._questData['quest' + (id + 1)].questId()]['failed'] = false;
            };
            var objectives = questData[id].QuestObjectiveSettings;
            for(var set = 0; set < objectives.length; ++ set) {
                this._data[this._questData['quest' + (id + 1)].questId()]['set' + (set + 1)] = new Quest_Objectives(set + 1,'set' + (set + 1),objectives[set]);
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエスト用の画像キャッシュ作成
    //--------------------------------------------------------------------------
    createQuestCashes(quest) {
        if(Utils.RPGMAKER_NAME === "MZ") return;
        if(quest._questClient.QuestClientSprite.SpriteName !== "") {
            var spriteName = quest._questClient.QuestClientSprite.SpriteName;
            if(Ayatam.QUEST.imgCashes['characters'][spriteName] === undefined) {
                var loaded = ImageManager.loadCharacter(spriteName);
                var Big = ImageManager.isBigCharacter(spriteName);
                Ayatam.QUEST.imgCashes['characters'][spriteName] = { img: loaded , isBig: Big };
            };
        };
        if(quest._questClient.QuestClientPicture.UsePicture) {
            var pictureName = quest._questClient.QuestClientPicture.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● カスタマイズ用の画像キャッシュ作成
    //--------------------------------------------------------------------------
    createCustamizeCashes() {
        if(Utils.RPGMAKER_NAME === "MZ") return;
        if(Ayatam.QUEST.CustamizeSettings.BoardWindow.BoardBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.BoardWindow.BoardBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.MustWindow.MustBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.MustWindow.MustBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestMenuImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestMenuImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
        if(Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackImg.UsePicture) {
            var pictureName = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackImg.PictureFile;
            if(pictureName !== "") {
                if(Ayatam.QUEST.imgCashes['Quests'][pictureName] === undefined) {
                    var loaded = ImageManager.loadQuests(pictureName);
                    Ayatam.QUEST.imgCashes['Quests'][pictureName] = { img: loaded , isBig: null };
                };
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストデータの参照
    //--------------------------------------------------------------------------
    questData() {
        return this._questData;
    }
    //--------------------------------------------------------------------------
    // ● クエスト受注状況データの参照
    //--------------------------------------------------------------------------
    questInformation() {
        return this._data;
    }
    //--------------------------------------------------------------------------
    // ● クエストのデータベース検索
    //--------------------------------------------------------------------------
    findQuest(questId) {
        if(this._questData[questId] === undefined) {
            console.error('高機能クエストシステム MV : Error :\n「' + questId + '」のクエストはデータベースに存在しません。\n「' + questId + '」can not find in quest database.');
            require('nw.gui').Window.get().showDevTools();
            AudioManager.playSe({ "name": "Computer", "volume": 70, "pitch": 100, "pan": 0 });
            return false;
        }else{
            return this._questData[questId];
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストボードの表示条件 「通常モード時 リストid 0」
    //--------------------------------------------------------------------------
    canBoardShow(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return false;
        if(this._questMode.failing) {
            if(this.isAssented(questId) || this.isReported(questId) || this.isFailed(questId)) {
                return false;
            }else{
                return this.checkCanBoardShow(questId);
            };
        }else{
            if(this.isAssented(questId) || this.isReported(questId)) {
                return false;
            }else{
                return this.checkCanBoardShow(questId);
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストボードの表示条件 「必須条件表示モード時 リストid 1」
    //   最初に登録されたアクターのレベル条件とNPC以外なら許可
    //--------------------------------------------------------------------------
    canBoardShowActorLevel(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return false;
        var checkBoardActorLevelShowModeData = [this.checkFirstActorLevel(questId),!this._questData[questId].questOnlyNpc()];
        if(this._questMode.failing) {
            if(this.isAssented(questId) || this.isReported(questId) || this.isFailed(questId)) {
                return false;
            }else{
                return !checkBoardActorLevelShowModeData.includes(false);
            };
        }else{
            if(this.isAssented(questId) || this.isReported(questId)) {
                return false;
            }else{
                return !checkBoardActorLevelShowModeData.includes(false);
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストボードの表示条件 「NPC限定以外表示モード リストid 2」
    //--------------------------------------------------------------------------
    canBoardShowAll(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return false;
        if(this._questMode.failing) {
            if(this.isAssented(questId) || this.isReported(questId) || this.isFailed(questId)) {
                return false;
            }else{
                return !this._questData[questId].questOnlyNpc();
            };
        }else{
            if(this.isAssented(questId) || this.isReported(questId)) {
                return false;
            }else{
                return !this._questData[questId].questOnlyNpc();
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストボードの表示条件「各比較対象の検査」
    //--------------------------------------------------------------------------
    checkCanBoardShow(questId) {
        var checkBoardNeededData = [];
        var lvl = true; var csw = true; var cvar = true;
        var cqna = true; var cqnc = true;
        this._globalSettings.QuestSelectRequirement.UseActorLevel ? lvl = this.checkActorLevel(questId) : lvl = true;
        this._globalSettings.QuestSelectRequirement.UseSw ? csw = this.checkSwithCondition(questId) : csw = true;
        this._globalSettings.QuestSelectRequirement.UseVal ? cvar = this.checkValCondition(questId) : cvar = true;
        this._globalSettings.QuestSelectRequirement.UseQuestAssented ? cqna = this.checkQuestNeedAssented(questId) : cqna = true;
        this._globalSettings.QuestSelectRequirement.UseQuestReported ? cqnc = this.checkQuestNeedReported(questId) : cqnc = true;
        var onp = !this._questData[questId].questOnlyNpc();
        checkBoardNeededData.push(lvl,csw,cvar,cqna,cqnc,onp);
        return !checkBoardNeededData.includes(false);
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「各比較対象の検査」
    //--------------------------------------------------------------------------
    checkCanAssent(questId) {
        var checkAllNeededData = [];
        var lvl = true; var mm = true; var om = true; var maxm = true;
        var csw = true; var cvar = true; var cqna = true; var cqnc = true;
        this._globalSettings.QuestSelectRequirement.UseActorLevel ? lvl = this.checkActorLevel(questId) : lvl = true;
        this._globalSettings.QuestSelectRequirement.UseNeededMember ? mm = this.checkNeededMember(questId) : mm = true;
        this._globalSettings.QuestSelectRequirement.UseOutedMember ? om = this.checkOutedMember(questId) : om = true;
        this._globalSettings.QuestSelectRequirement.UseMaxMember ? maxm = this.checkMaxMember(questId) : maxm = true;
        this._globalSettings.QuestSelectRequirement.UseSw ? csw = this.checkSwithCondition(questId) : csw = true;
        this._globalSettings.QuestSelectRequirement.UseVal ? cvar = this.checkValCondition(questId) : cvar = true;
        this._globalSettings.QuestSelectRequirement.UseQuestAssented ? cqna = this.checkQuestNeedAssented(questId) : cqna = true;
        this._globalSettings.QuestSelectRequirement.UseQuestReported ? cqnc = this.checkQuestNeedReported(questId) : cqnc = true;
        checkAllNeededData.push(lvl, mm, om, maxm, csw, cvar,cqna,cqnc);
        return !checkAllNeededData.includes(false);
    }
    //--------------------------------------------------------------------------
    // ● 1番目のアクターレベルを確認
    //--------------------------------------------------------------------------
    checkFirstActorLevel(questId) {
        if (this._questData[questId].questActorLevel() === null || this._questData[questId].questActorLevel() === "") {
            return true;
        };
        var checkNeededAllActorLevel = [];
        var actorList = this._questData[questId].questActorLevel();
        if (actorList.length === 0) {
            return true;
        } else {
            actorList.forEach(actor => {
                checkNeededAllActorLevel.push($gameActors.actor(actor.Actor).level >= actor.ActorLevel);
            });
            return checkNeededAllActorLevel[0];
        };
    }
    //--------------------------------------------------------------------------
    // ● アクターレベルを確認
    //--------------------------------------------------------------------------
    checkActorLevel(questId) {
        if (this._questData[questId].questActorLevel() === null || this._questData[questId].questActorLevel() === "") {
            return true;
        };
        var checkNeededAllActorLevel = [];
        var actorList = this._questData[questId].questActorLevel();
        if (actorList.length === 0) {
            return true;
        } else {
            actorList.forEach(actor => {
                checkNeededAllActorLevel.push($gameActors.actor(actor.Actor).level >= actor.ActorLevel);
            });
            return !checkNeededAllActorLevel.includes(false);
        };
    }
    //--------------------------------------------------------------------------
    // ● 対象のアクターがパーティにいるか？
    //--------------------------------------------------------------------------
    checkNeededMember(questId) {
        if (this._questData[questId].questNeededActors() === null || this._questData[questId].questNeededActors() === "") {
            return true;
        };
        var checkNeededMember = [];
        var memberList = this._questData[questId].questNeededActors();
        if (memberList.length === 0) {
            return true;
        } else {
            memberList.forEach(actor => {
                checkNeededMember.push($gameParty.members().contains($gameActors.actor(actor)));
            });
            return !checkNeededMember.includes(false);
        };
    }
    //--------------------------------------------------------------------------
    // ● 対象のアクターがパーティにいないか？
    //--------------------------------------------------------------------------
    checkOutedMember(questId) {
        if (this._questData[questId].questOutedActors() === null || this._questData[questId].questOutedActors() === "") {
            return true;
        };
        var checkOutedMember = [];
        var memberList = this._questData[questId].questOutedActors();
        if (memberList.length === 0) {
            return true;
        } else {
            memberList.forEach(actor => {
                checkOutedMember.push($gameParty.members().contains($gameActors.actor(actor)));
            });
            return !checkOutedMember.includes(true);
        };
    }
    //--------------------------------------------------------------------------
    // ● 同行可能人数か？
    //--------------------------------------------------------------------------
    checkMaxMember(questId) {
        if (this._questData[questId].questMaxMember() === null || this._questData[questId].questMaxMember() === "" || this._questData[questId].questMaxMember() === 0) {
            return true;
        };
        if ($gameParty.size() <= this._questData[questId].questMaxMember()) {
            return true;
        } else {
            return false;
        };
    }
    //--------------------------------------------------------------------------
    // ● スイッチ条件を確認
    //--------------------------------------------------------------------------
    checkSwithCondition(questId) {
        if (this._questData[questId].questSwitchConditions() === null || this._questData[questId].questSwitchConditions() === "") {
            return true;
        };
        var checkSwitches = [];
        var switches = this._questData[questId].questSwitchConditions();
        if (switches.length === 0) {
            return true;
        } else {
            switches.forEach(sw => {
                checkSwitches.push($gameSwitches.value(sw.SwID) === sw.SwBoolean);
            });
            return !checkSwitches.includes(false);
        };
    }
    //--------------------------------------------------------------------------
    // ● 変数条件を確認
    //--------------------------------------------------------------------------
    checkValCondition(questId) {
        if (this._questData[questId].questValConditions() === null || this._questData[questId].questValConditions() === "") {
            return true;
        };
        var checkVariables = [];
        var variables = this._questData[questId].questValConditions();
        if (variables.length === 0) {
            return true;
        } else {
            variables.forEach(val => {
                if (val.ValCondition === "mt") {
                    checkVariables.push($gameVariables.value(val.Val) > Number(val.ValValue));
                } else if (val.ValCondition === "imt") {
                    checkVariables.push($gameVariables.value(val.Val) >= Number(val.ValValue));
                } else if (val.ValCondition === "lt") {
                    checkVariables.push($gameVariables.value(val.Val) < Number(val.ValValue));
                } else if (val.ValCondition === "ilt") {
                    checkVariables.push($gameVariables.value(val.Val) <= Number(val.ValValue));
                } else if (val.ValCondition === "just") {
                    checkVariables.push($gameVariables.value(val.Val) === Number(val.ValValue));
                } else if (val.ValCondition === "stringcheck") {
                    checkVariables.push($gameVariables.value(val.Val) === String(val.ValValue));
                };
            });
            return !checkVariables.includes(false);
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注状況を確認
    //--------------------------------------------------------------------------
    checkQuestNeedAssented(questId) {
        if(this._questData[questId].questNeedAssentedQuests() === null || this._questData[questId].questNeedAssentedQuests() === "") {
            return true;
        };
        var checkQuestAssented = [];
        var NeededQuests = this._questData[questId].questNeedAssentedQuests();
        if(NeededQuests.length === 0){
            return true;
        }else{
            NeededQuests.forEach(quest => {
                if(quest !== 0) {
                    checkQuestAssented.push($gameParty.quests()['quest' + quest]['assent']);
                };
            });
            return !checkQuestAssented.includes(false);
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストデータの報告状況を確認
    //--------------------------------------------------------------------------
    checkQuestNeedReported(questId) {
        if(this._questData[questId].questNeedReportedQuests() === null || this._questData[questId].questNeedReportedQuests() === "") {
            return true;
        };
        var checkQuestReported = [];
        var ReportedQuests = this._questData[questId].questNeedReportedQuests();
        if(ReportedQuests.length === 0){
            return true;
        }else{
            ReportedQuests.forEach(quest => {
                if(quest !== 0) {
                    checkQuestReported.push($gameParty.quests()['quest' + quest]['reported']);
                };
            });
            return !checkQuestReported.includes(false);
        };
    }
    //--------------------------------------------------------------------------
    // ● 受注クエストをすべて取得
    //--------------------------------------------------------------------------
    getAllAssentedQuests() {
        var questData = Ayatam.QUEST.QuestDatabase;
        var QuestLists = [];
        for(var i = 0; i < questData.length; ++i){
            if(this._questMode.failing) {
                if(this.isAssented('quest' + (i + 1)) && !this.isReported('quest' + (i + 1)) && !this.isFailed('quest' + (i + 1))) QuestLists.push(this.findQuest('quest' + (i + 1)));
            }else{
                if(this.isAssented('quest' + (i + 1)) && !this.isReported('quest' + (i + 1))) QuestLists.push(this.findQuest('quest' + (i + 1)));
            };
        };
        if(QuestLists.length === 0) return null;
        return QuestLists;
    }
    //--------------------------------------------------------------------------
    // ● 報告済みクエストをすべて取得
    //--------------------------------------------------------------------------
    getAllReportedQuests() {
        var questData = Ayatam.QUEST.QuestDatabase;
        var QuestLists = [];
        for(var i = 0; i < questData.length; ++i){
            if(this._questMode.failing) {
                if(this.isReported('quest' + (i + 1)) && !this.isFailed('quest' + (i + 1))) QuestLists.push(this.findQuest('quest' + (i + 1)));
            }else{
                if(this.isReported('quest' + (i + 1))) QuestLists.push(this.findQuest('quest' + (i + 1)));
            };
        };
        if(QuestLists.length === 0) return null;
        return QuestLists;
    }
    //--------------------------------------------------------------------------
    // ● 失敗クエストをすべて取得
    //--------------------------------------------------------------------------
    getAllFailedQuests() {
        if(this._questMode.failing) return null;
        var questData = Ayatam.QUEST.QuestDatabase;
        var QuestLists = [];
        for(var i = 0; i < questData.length; ++i){
            if(!this.isReported('quest' + (i + 1)) && this.isFailed('quest' + (i + 1))) QuestLists.push(this.findQuest('quest' + (i + 1)));
        };
        if(QuestLists.length === 0) return null;
        return QuestLists;
    }
    //--------------------------------------------------------------------------
    // ● クエストをすべて取得
    //--------------------------------------------------------------------------
    getAllQuests() {
        var questData = Ayatam.QUEST.QuestDatabase;
        var QuestLists = [];
        for(var i = 0; i < questData.length; ++i){
            QuestLists.push(questData[i]);
        };
        return QuestLists;
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的を取得
    //--------------------------------------------------------------------------
    getObjective(questId,setId) {
        var quest = this.findQuest(questId);
        if(quest === false) return;
        return $gameParty.quests()[questId][setId];
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的の達成数を取得
    //--------------------------------------------------------------------------
    getObjectiveAmount(questId,setId) {
        var quest = this.findQuest(questId);
        if(quest === false) return;
        return $gameParty.quests()[questId][setId]._target;
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的をすべて取得
    //--------------------------------------------------------------------------
    getAllObjectives(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return null;
        var questData = Ayatam.QUEST.QuestDatabase;
        var Id = questId;
        var quest = Id.split('quest');
        var objectives = questData[quest[1]-1].QuestObjectiveSettings;
        var objectiveLists = [];
        for(var i = 0; i < objectives.length; ++i) {
            objectiveLists.push($gameParty.questObjectives(questId,'set'+(i+1)));
        };
        if(objectiveLists.length === 0) return null;
        return objectiveLists;
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的に値を代入
    //--------------------------------------------------------------------------
    questInsObj(questId,setId,amount,counter = false) {
        var quest = this.isQuestAbleToEnter(questId,setId);
        if(!quest) return;
        if(this._questData[questId].getLastObjAmount(setId) === amount) return;
        this._questData[questId].setLastObjAmount(setId,amount);
        if(amount < 0) {
            this.getObjective(questId,setId)._target = 0;
        }else{
            this.getObjective(questId,setId)._target = amount;
        };
        if(this.canReport(questId) && !this._questData[questId].questAutoReport() && !this._questData[questId].isAbleToReport()) {
            this.objClearSound();
            this._questData[questId].setAbleToReport(true);
        }else{
            if(!this._questData[questId].isAbleToReport()) this.getSound(counter);
        };
        if(this.canReport(questId) && this._questData[questId].questAutoReport()) {
            this.questReport(questId);
        };
        this._questData[questId].getObjectiveCommonEvent(setId);
        $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的に値を加算
    //--------------------------------------------------------------------------
    questAddObj(questId,setId,amount) {
        var quest = this.isQuestAbleToEnter(questId,setId);
        if(!quest) return;
        this.getObjective(questId,setId)._target += amount;
        if(this.canReport(questId) && !this._questData[questId].questAutoReport() && !this._questData[questId].isAbleToReport()) {
            this.objClearSound();
            this._questData[questId].setAbleToReport(true);
        }else{
            if(!this._questData[questId].isAbleToReport()) this.getSound();
        };
        if(this.canReport(questId) && this._questData[questId].questAutoReport()) {
            this.questReport(questId);
        };
        this._questData[questId].getObjectiveCommonEvent(setId);
        $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的に値を減算
    //--------------------------------------------------------------------------
    questSubObj(questId,setId,amount) {
        var quest = this.isQuestAbleToEnter(questId,setId);
        if(!quest) return;
        var result = this.getObjective(questId,setId)._target - amount;
        if(result <= 0) {
            this.getObjective(questId,setId)._target = 0;
        }else{
            this.getObjective(questId,setId)._target -= amount;
        };
        if(this.canReport(questId) && !this._questData[questId].questAutoReport() && !this._questData[questId].isAbleToReport()) {
            this.objClearSound();
            this._questData[questId].setAbleToReport(true);
        }else{
            if(!this.canReport(questId)) {
                if(this._questData[questId].isAbleToReport()) {
                    var judgeReset = this.getObjective(questId,setId).getClearAmount() - 1;
                    if(judgeReset <= this.getObjective(questId,setId)._target) this._questData[questId].setAbleToReport(false);
                };
            };
            if(!this._questData[questId].isAbleToReport()) this.lostSound();
        };
        if(this.canReport(questId) && this._questData[questId].questAutoReport()) {
            this.questReport(questId);
        };
        $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● クエストデータへの入力規制
    //--------------------------------------------------------------------------
    isQuestAbleToEnter(questId,setId) {
        var quest = this.findQuest(questId);
        if(quest === false) return false;
        if(!this.isAssented(questId)) return false;
        if(this.isReported(questId)) return false;
        if(this._questMode.failing){
            if(this.isFailed(questId)) return false;
        };
        if(this._questData[questId].isRootQuest() && !this.rootQuestMode(questId,setId)) {
            return false;
        };
        return true;
    }
    //--------------------------------------------------------------------------
    // ● ルートクエストの制限
    //--------------------------------------------------------------------------
    rootQuestMode(questId,setId) {
        var Id = questId.split('quest');
        var questData = Ayatam.QUEST.QuestDatabase;
        var objectives = questData[Id[1]-1].QuestObjectiveSettings;
        var obj = null;
        for(var set = 0; set < objectives.length; ++ set) {
            if(this.getObjective(questId,'set' + (set + 1)).cleared() === false) {
                obj = 'set' + (set + 1);
                break;
            }else{
                var setObj = 'set' + (set + 1);
                if(setObj === setId){
                    obj = setObj;
                    break;
                };
            };
        };
        return obj === setId;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件を満たしているか？
    //--------------------------------------------------------------------------
    canAssent(questId) {
        var quest = this.findQuest(questId);
        if (quest === false) return false;
        if(this._questMode.failing) {
            if (this.isAssented(questId) || this.isReported(questId) || this.isFailed(questId)) {
                return false;
            } else {
                return this.checkCanAssent(questId);
            };
        }else{
            if (this.isAssented(questId) || this.isReported(questId)) {
                return false;
            } else {
                return this.checkCanAssent(questId);
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注
    //--------------------------------------------------------------------------
    questAssent(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return;
        if(this._questMode.failing){
            if(this.isFailed(questId)) return;
        };
        $gameParty.questSetAssent(questId,true);
        this.assentSound();
        this.executeAssentedActions(questId);
        this.executeAssentedObjActions(questId);
        $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● すべてのクエストの受注
    //--------------------------------------------------------------------------
    assentAllQuest() {
        var questData = Ayatam.QUEST.QuestDatabase;
        for (var id = 0; id < questData.length; ++id) {
            if(!this.isAssented('quest' + (id + 1))) this.questAssent('quest' + (id + 1));
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注後のセットアップ
    //--------------------------------------------------------------------------
    executeAssentedActions(questId) {
        var AssentSetup = this._questData[questId].questAssentedSetup();
        if(AssentSetup !== null) {
            var selfSw = AssentSetup.ActivateSelfSw;
            var Sw = AssentSetup.ActivateSw;
            var Val = AssentSetup.ActivateVal;
            var AutoAddQuests = AssentSetup.AutoAddQuests;
            if(selfSw !== null) {
                selfSw.forEach(selfsw => {
                    var key = [selfsw.MapID,selfsw.EventID,selfsw.SwitchType];
                    $gameSelfSwitches.setValue(key, selfsw.SelfSwBoolean);
                });
            };
            if(Sw !== null) {
                Sw.forEach(sw => {
                    $gameSwitches.setValue(sw.ActivateSwID,sw.SwBoolean);
                });
            };
            if(Val !== null) {
                Val.forEach(val => {
                    if(val.ValCondition === "ins") {
                        $gameVariables.setValue(val.ActivateVal,val.ValValue);
                    }else if(val.ValCondition === "add"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,1,Number(val.ValValue));
                    }else if(val.ValCondition === "sub"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,2,Number(val.ValValue));
                    };
                });
            };
            if(AutoAddQuests !== null) {
                if(AutoAddQuests !== 0) {
                    AutoAddQuests.forEach(quest => {
                        this.questAssent('quest' + quest);
                    });
                };
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注後の目的セットアップ
    //--------------------------------------------------------------------------
    executeAssentedObjActions(questId) {
        if(this.getAllObjectives(questId) === null) return;
        this.getAllObjectives(questId).forEach(obj => {
            if(obj._contentType === 'valquest') {
                var amount = $gameVariables.value(obj._contentId);
                Ayatam.QUEST.insObjSilent(questId,obj._id,amount,true);
            }else if(obj._contentType === 'itemquest') {
                if(obj._itemSelect === 'Item') {
                    var amount = $gameParty.numItems($dataItems[obj._contentId]);
                    Ayatam.QUEST.insObjSilent(questId,obj._id,amount,true);
                }else if(obj._itemSelect === 'Weapon') {
                    var amount = $gameParty.numItems($dataWeapons[obj._contentId]);
                    Ayatam.QUEST.insObjSilent(questId,obj._id,amount,true);
                }else if(obj._itemSelect === 'Armor') {
                    var amount = $gameParty.numItems($dataArmors[obj._contentId]);
                    Ayatam.QUEST.insObjSilent(questId,obj._id,amount,true);
                };
            }else if(obj._contentType === 'selectedquestcleared') {
                if(this.isReported(obj._contentId)) {
                    Ayatam.QUEST.insObjSilent(questId,obj._id,1,true);
                };
            };
        });
    }
    //--------------------------------------------------------------------------
    // ● クエストは放棄可能か？
    //--------------------------------------------------------------------------
    canCancel(questId) {
        if(this._questMode.failing) {
            return this.isAssented(questId) && !this.isReported(questId) && !this.isFailed(questId) && this.canExecuteCancel(questId);
        }else{
            return this.isAssented(questId) && !this.isReported(questId) && this.canExecuteCancel(questId);
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの放棄は実行可能か？
    //--------------------------------------------------------------------------
    canExecuteCancel(questId) {
        var CancelSetup = this._questData[questId].questCanceledSetup();
        if(CancelSetup === null) return true;
        if(CancelSetup !== null) {
            var CancelFlag = !CancelSetup.CancelLock;
            if(CancelFlag === null) {
                return true;
            }else if(CancelFlag !== null) {
                return CancelFlag;
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● 受注クエストの放棄
    //--------------------------------------------------------------------------
    questCancel(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return;
        this.resetQuest(questId,false);
        $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● クエストの放棄後のセットアップ
    //--------------------------------------------------------------------------
    executeCancelActions(questId) {
        var CancelSetup = this._questData[questId].questCanceledSetup();
        if(CancelSetup !== null) {
            var selfSw = CancelSetup.CancelSelfSw;
            var Sw = CancelSetup.CancelSw;
            var Val = CancelSetup.CancelVal;
            if(selfSw !== null) {
                selfSw.forEach(selfsw => {
                    var key = [selfsw.MapID,selfsw.EventID,selfsw.SwitchType];
                    $gameSelfSwitches.setValue(key, selfsw.SelfSwBoolean);
                });
            };
            if(Sw !== null) {
                Sw.forEach(sw => {
                    $gameSwitches.setValue(sw.ActivateSwID,sw.SwBoolean);
                });
            };
            if(Val !== null) {
                Val.forEach(val => {
                    if(val.ValCondition === "ins") {
                        $gameVariables.setValue(val.ActivateVal,val.ValValue);
                    }else if(val.ValCondition === "add"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,1,Number(val.ValValue));
                    }else if(val.ValCondition === "sub"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,2,Number(val.ValValue));
                    };
                });
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● 対象クエストは失敗可能か？
    //--------------------------------------------------------------------------
    canFail(questId) {
        if(!this._questMode.failing) return false;
        var quest = this.findQuest(questId);
        if (quest === false) return false;
        if(!this.isAssented(questId)) return false;
        if(this.isReported(questId)) return false;
        return true;
    }
    //--------------------------------------------------------------------------
    // ● 受注クエストの失敗
    //--------------------------------------------------------------------------
    questFail(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return;
        if(!this._questMode.failing) return;
        $gameParty.questSetFailed(questId,true);
        this.failedSound();
        this.unSetNav(questId);
        this.executeFailedActions(questId);
        $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● クエストの失敗後のセットアップ
    //--------------------------------------------------------------------------
    executeFailedActions(questId) {
        var FailedSetup = this._questData[questId].questFailedSetup();
        if(FailedSetup !== null) {
            var selfSw = FailedSetup.FailedSelfSw;
            var Sw = FailedSetup.FailedSw;
            var Val = FailedSetup.FailedVal;
            var commonId = FailedSetup.FailedCommonEvent;
            if(selfSw !== null) {
                selfSw.forEach(selfsw => {
                    var key = [selfsw.MapID,selfsw.EventID,selfsw.SwitchType];
                    $gameSelfSwitches.setValue(key, selfsw.SelfSwBoolean);
                });
            };
            if(Sw !== null) {
                Sw.forEach(sw => {
                    $gameSwitches.setValue(sw.ActivateSwID,sw.SwBoolean);
                });
            };
            if(Val !== null) {
                Val.forEach(val => {
                    if(val.ValCondition === "ins") {
                        $gameVariables.setValue(val.ActivateVal,val.ValValue);
                    }else if(val.ValCondition === "add"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,1,Number(val.ValValue));
                    }else if(val.ValCondition === "sub"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,2,Number(val.ValValue));
                    };
                });
            };
            if(commonId !== null) {
                if(commonId !== 0) {
                    if(this._questData[questId]._checkReservedCommonEvents.failedCommonEvent !== commonId) {
                        this._questData[questId]._checkReservedCommonEvents.failedCommonEvent = commonId
                    };
                    this._questData[questId]._checkReservedCommonEvents.failedCommonActivate = true;
                    this._questData[questId].setAllQuestCommmonExecuted(false);
                };
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● 対象クエストは報告可能か？
    //--------------------------------------------------------------------------
    canReport(questId) {
        var quest = this.findQuest(questId);
        if (quest === false) return false;
        if(this._questMode.failing) {
            if(this.isFailed(questId)) return false;
        };
        if(this.isReported(questId)) return false;
        var Id = questId.split('quest');
        var questData = Ayatam.QUEST.QuestDatabase;
        var objectives = questData[Id[1]-1].QuestObjectiveSettings;
        for(var set = 0; set < objectives.length; ++ set) {
            if(this.getObjective(questId,'set' + (set + 1)).cleared() === false) {
                return false;
            };
        };
        return true;
    }
    //--------------------------------------------------------------------------
    // ● クエストの報告
    //--------------------------------------------------------------------------
    questReport(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return;
        if(this._questMode.failing){
            if(this.isFailed(questId)) return;
        };
        if(this.isReported(questId)) return;
        $gameParty.questSetReported(questId,true);
        this.reportSound();
        this.unSetNav(questId);
        this.getReportReward(questId);
        this.loseReportReward(questId);
        this.executeReportedActions(questId);
        this.executeReportedObjActions(questId);
        $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● クエストの報酬の受け取り
    //--------------------------------------------------------------------------
    getReportReward(questId) {
        var rewardGold = this._questData[questId].rewardGold();
        var rewardExp = this._questData[questId].rewardExp();
        var rewardItems = this._questData[questId].rewardItems();
        if(rewardGold > 0) $gameParty.gainGold(rewardGold);
        if(rewardExp > 0){
            $gameParty.members().forEach(actor => {
                actor.changeExp(actor.currentExp() + rewardExp,this._questMode.showLevelUp);
            });
        };
        if(rewardItems !== null){
            rewardItems.forEach(item => {
                if(item.UseWitchItem === "Item") {
                    $gameParty.gainItem($dataItems[item.SelectedItem], item.Amount); 
                }else if(item.UseWitchItem === "Weapon"){
                    $gameParty.gainItem($dataWeapons[item.SelectedWeapon], item.Amount, true);
                }else if(item.UseWitchItem === "Armor"){
                    $gameParty.gainItem($dataArmors[item.SelectedArmor], item.Amount, true);
                };
            });
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの報酬時に消失する持ち物
    //--------------------------------------------------------------------------
    loseReportReward(questId) {
        var loseGold = this._questData[questId].loseGold();
        var loseExp = this._questData[questId].loseExp();
        var loseItems = this._questData[questId].loseItems();
        if(loseGold > 0) $gameParty.loseGold(loseGold);
        if(loseExp > 0) {
            $gameParty.members().forEach(actor => {
                actor.changeExp(actor.currentExp() - loseExp,this._questMode.showLevelUp);
            });
        };
        if(loseItems !== null) {
            loseItems.forEach(item => {
                if(item.UseWitchItem === "Item") {
                    $gameParty.loseItem($dataItems[item.SelectedItem], item.Amount);
                }else if(item.UseWitchItem === "Weapon"){
                    $gameParty.loseItem($dataWeapons[item.SelectedWeapon], item.Amount, true);
                }else if(item.UseWitchItem === "Armor"){
                    $gameParty.loseItem($dataArmors[item.SelectedArmor], item.Amount, true);
                };
            });
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの報告後のセットアップ
    //--------------------------------------------------------------------------
    executeReportedActions(questId) {
        var ReportSetup = this._questData[questId].questReportedSetup();
        if(ReportSetup !== null) {
            var selfSw = ReportSetup.ClearedSelfSw;
            var Sw = ReportSetup.ClearedSw;
            var Val = ReportSetup.ClearedVal;
            var commonId = ReportSetup.ClearedCommonEvent;
            if(selfSw !== null) {
                selfSw.forEach(selfsw => {
                    var key = [selfsw.MapID,selfsw.EventID,selfsw.SwitchType];
                    $gameSelfSwitches.setValue(key, selfsw.SelfSwBoolean);
                });
            };
            if(Sw !== null) {
                Sw.forEach(sw => {
                    $gameSwitches.setValue(sw.ActivateSwID,sw.SwBoolean);
                });
            };
            if(Val !== null) {
                Val.forEach(val => {
                    if(val.ValCondition === "ins") {
                        $gameVariables.setValue(val.ActivateVal,val.ValValue);
                    }else if(val.ValCondition === "add"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,1,Number(val.ValValue));
                    }else if(val.ValCondition === "sub"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,2,Number(val.ValValue));
                    };
                });
            };
            if(commonId !== null) {
                if(commonId !== 0) {
                    if(this._questData[questId]._checkReservedCommonEvents.reportedCommonEvent !== commonId) {
                        this._questData[questId]._checkReservedCommonEvents.reportedCommonEvent = commonId;
                    };
                    this._questData[questId]._checkReservedCommonEvents.reportCommonActivate = true;
                    this._questData[questId].setAllQuestCommmonExecuted(false);
                };
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの報告後の目的セットアップ
    //--------------------------------------------------------------------------
    executeReportedObjActions(questId) {
        if(this.getAllAssentedQuests() === null) return;
        this.getAllAssentedQuests().forEach(quest => {
            if(this.getAllObjectives(quest._id) !== null) {
                this.getAllObjectives(quest._id).forEach(set => {
                    if(set._contentType === 'selectedquestcleared') {
                        if(set._contentId === questId) {
                            if(SceneManager._scene.constructor !== Scene_Map) {
                                Ayatam.QUEST.insObjSilent(quest._id,set._id,1,true);
                            }else{
                                Ayatam.QUEST.insObjSilent(quest._id,set._id,1);
                            };
                        };
                    };
                });
            };
        });
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注をしているか？
    //--------------------------------------------------------------------------
    isAssented(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return false;
        return $gameParty.quests()[questId]['assent'];
    }
    //--------------------------------------------------------------------------
    // ● クエストが進行中か？
    //--------------------------------------------------------------------------
    isQuestActive(questId) {
        if(this._questMode.failing) {
            return this.isAssented(questId) && !this.isReported(questId) && !this.isFailed(questId);
        }else{
            return this.isAssented(questId) && !this.isReported(questId);
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの報告済みか？
    //--------------------------------------------------------------------------
    isReported(questId) {
        var quest = this.findQuest(questId);
        if(quest === false) return false;
        return $gameParty.quests()[questId]['reported'];
    }
    //--------------------------------------------------------------------------
    // ● クエストが失敗しているか？
    //--------------------------------------------------------------------------
    isFailed(questId) {
        if(!this._questMode.failing) return false;
        var quest = this.findQuest(questId);
        if(quest === false) return false;
        return $gameParty.quests()[questId]['failed'];
    }
    //--------------------------------------------------------------------------
    // ● クエストの初期化
    //--------------------------------------------------------------------------
    resetQuest(questId,needRefresh = true) {
        var quest = this.findQuest(questId);
        if(quest === false) return;
        if(this.isAssented(questId)) {
            this.resetAssentedActions(questId);
            $gameParty.questSetAssent(questId,false);
        };
        if(this.isReported(questId)) {
            this.resetReportedActions(questId);
            $gameParty.questSetReported(questId,false);
        };
        if(this._questMode.failing){
            if(this.isFailed(questId)) {
                this.resetFailedActions(questId);
                $gameParty.questSetFailed(questId,false);
            };
        };
        this.unSetNav(questId);
        this.executeCancelActions(questId);
        this._questData[questId].setAbleToReport(false);
        var Id = questId.split('quest');
        var questData = Ayatam.QUEST.QuestDatabase;
        var objectives = questData[Id[1]-1].QuestObjectiveSettings;
        this._questData[questId].resetQuestCommonEvent();
        for(var set = 0; set < objectives.length; ++set) {
            this.getObjective(questId,'set' + (set + 1))._target = 0;
            this._questData[questId].setLastObjAmount('set' + (set + 1),0);
            this._questData[questId].resetObjectiveCommonEvent('set' + (set + 1));
        };
        if(needRefresh) $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● すべてのクエストの初期化
    //--------------------------------------------------------------------------
    resetAllQuest() {
        var questData = Ayatam.QUEST.QuestDatabase;
        for (var id = 0; id < questData.length; ++id) {
            if(this.isAssented('quest' + (id + 1))) this.resetQuest('quest' + (id + 1),false);
        };
        $gameMap._needsRefresh = true;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注情報の初期化
    //--------------------------------------------------------------------------
    resetAssentedActions(questId) {
        var AssentSetup = this._questData[questId].questAssentedSetup();
        if(AssentSetup !== null) {
            var selfSw = AssentSetup.ActivateSelfSw;
            var Sw = AssentSetup.ActivateSw;
            var Val = AssentSetup.ActivateVal;
            var AutoAddQuests = AssentSetup.AutoAddQuests;
            if(selfSw !== null) {
                selfSw.forEach(selfsw => {
                    var key = [selfsw.MapID,selfsw.EventID,selfsw.SwitchType];
                    $gameSelfSwitches.setValue(key, !selfsw.SelfSwBoolean);
                });
            };
            if(Sw !== null) {
                Sw.forEach(sw => {
                    $gameSwitches.setValue(sw.ActivateSwID,!sw.SwBoolean);
                });
            };
            if(Val !== null) {
                Val.forEach(val => {
                    if(val.ValCondition === "ins") {
                        $gameVariables.setValue(val.ActivateVal,0);
                    }else if(val.ValCondition === "add"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,2,Number(val.ValValue));
                    }else if(val.ValCondition === "sub"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,1,Number(val.ValValue));
                    };
                });
            };
            if(AutoAddQuests !== null) {
                if(AutoAddQuests !== 0) {
                    AutoAddQuests.forEach(quest => {
                        this.questCancel('quest' + quest);
                    });
                };
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの報告情報の初期化
    //--------------------------------------------------------------------------
    resetReportedActions(questId) {
        var ReportSetup = this._questData[questId].questReportedSetup();
        if(ReportSetup !== null) {
            var selfSw = ReportSetup.ClearedSelfSw;
            var Sw = ReportSetup.ClearedSw;
            var Val = ReportSetup.ClearedVal;
            if(selfSw !== null) {
                selfSw.forEach(selfsw => {
                    var key = [selfsw.MapID,selfsw.EventID,selfsw.SwitchType];
                    $gameSelfSwitches.setValue(key, !selfsw.SelfSwBoolean);
                });
            };
            if(Sw !== null) {
                Sw.forEach(sw => {
                    $gameSwitches.setValue(sw.ActivateSwID,!sw.SwBoolean);
                });
            };
            if(Val !== null) {
                Val.forEach(val => {
                    if(val.ValCondition === "ins") {
                        $gameVariables.setValue(val.ActivateVal,0);
                    }else if(val.ValCondition === "add"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,2,Number(val.ValValue));
                    }else if(val.ValCondition === "sub"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,1,Number(val.ValValue));
                    };
                });
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの失敗情報の初期化
    //--------------------------------------------------------------------------
    resetFailedActions(questId) {
        var FailedSetup = this._questData[questId].questFailedSetup();
        if(FailedSetup !== null) {
            var selfSw = FailedSetup.FailedSelfSw;
            var Sw = FailedSetup.FailedSw;
            var Val = FailedSetup.FailedVal;
            if(selfSw !== null) {
                selfSw.forEach(selfsw => {
                    var key = [selfsw.MapID,selfsw.EventID,selfsw.SwitchType];
                    $gameSelfSwitches.setValue(key, !selfsw.SelfSwBoolean);
                });
            };
            if(Sw !== null) {
                Sw.forEach(sw => {
                    $gameSwitches.setValue(sw.ActivateSwID,!sw.SwBoolean);
                });
            };
            if(Val !== null) {
                Val.forEach(val => {
                    if(val.ValCondition === "ins") {
                        $gameVariables.setValue(val.ActivateVal,0);
                    }else if(val.ValCondition === "add"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,2,Number(val.ValValue));
                    }else if(val.ValCondition === "sub"){
                        $gameMap._interpreter.operateVariable(val.ActivateVal,1,Number(val.ValValue));
                    };
                });
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● 対象のクエストカテゴリーを参照
    //--------------------------------------------------------------------------
    questCategory(questId) {
        return this.findQuest(questId).questCategory();
    };
    //--------------------------------------------------------------------------
    // ● クエストナビゲーターにクエストを入れられるか
    //--------------------------------------------------------------------------
    canSetNav(questId) {
        if(this._questMode.noUseNavi) return false;
        if(this._questMode.failing) {
            if(!this.isAssented(questId) || this.isReported(questId) || this.isFailed(questId)){
                return false;
            }else{
                return true;
            };
        }else{
            if(!this.isAssented(questId) || this.isReported(questId)){
                return false;
            }else{
                return true;
            };
        };
    };
    //--------------------------------------------------------------------------
    // ● クエストを一つでも受注しているか？
    //--------------------------------------------------------------------------
    canOpenQuestMenu() {
        var questData = this.getAllQuests();
        var result = false;
        for(var i = 0; i < questData.length; ++i){
            result = this.isAssented('quest' + (i + 1));
            if(result) break;
        };
        return result;
    }
    //--------------------------------------------------------------------------
    // ● クエストナビゲーターにクエストが入っているか
    //--------------------------------------------------------------------------
    questInNavi() {
        return $gameParty.questInNavi();
    };
    //--------------------------------------------------------------------------
    // ● クエストをナビゲーターに設定
    //--------------------------------------------------------------------------
    setNav(questId) {
        if(this._questMode.noUseNavi) return;
        var quest = this.findQuest(questId);
        if(quest === false) return;
        $gameParty.setNav(questId);
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件画面にて選んだキーを保存
    //--------------------------------------------------------------------------
    setShowCheckQuestChoice(choice) {
        this._showCheckQuestChoice = choice;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件画面にて選んだキーを参照
    //--------------------------------------------------------------------------
    showCheckQuestChoice() {
        return this._showCheckQuestChoice;
    }
    //--------------------------------------------------------------------------
    // ● クエストをナビゲーターから除外
    //--------------------------------------------------------------------------
    unSetNav(questId) {
        if(this._questMode.noUseNavi) return;
        var quest = this.findQuest(questId);
        if(quest === false) return;
        $gameParty.unSetNav(questId);
    }
    //--------------------------------------------------------------------------
    // ● 受注効果音
    //--------------------------------------------------------------------------
    assentSound() {
        var assentSound = this._questSounds.assentSound;
        if(assentSound === null) return;
        if(!assentSound.UseQuestSound) return;
        AudioManager.playSe({"name": assentSound.QuestSound ,"volume":90,"pitch":100,"pan":0});
    }
    //--------------------------------------------------------------------------
    // ● 獲得効果音
    //--------------------------------------------------------------------------
    getSound(silence = false) {
        var getSound = this._questSounds.getSound;
        if(getSound === null) return;
        if(!getSound.UseQuestSound) return;
        if(silence) return;
        AudioManager.playSe({"name": getSound.QuestSound ,"volume":90,"pitch":100,"pan":0});
    }
    //--------------------------------------------------------------------------
    // ● 消失効果音
    //--------------------------------------------------------------------------
    lostSound() {
        var lostSound = this._questSounds.lostSound;
        if(lostSound === null) return;
        if(!lostSound.UseQuestSound) return;
        AudioManager.playSe({"name": lostSound.QuestSound ,"volume":90,"pitch":100,"pan":0});
    }
    //--------------------------------------------------------------------------
    // ● クリア効果音
    //--------------------------------------------------------------------------
    objClearSound() {
        var objClearSound = this._questSounds.objClearSound;
        if(objClearSound === null) return;
        if(!objClearSound.UseQuestSound) return;
        AudioManager.playMe({"name": objClearSound.QuestSound ,"volume":90,"pitch":100,"pan":0});
    }
    //--------------------------------------------------------------------------
    // ● 報告効果音
    //--------------------------------------------------------------------------
    reportSound() {
        var reportMeSound = this._questMeSounds.reportSound
        if(reportMeSound === null) return;
        if(!reportMeSound.UseQuestSound) return;
        AudioManager.playMe({"name": reportMeSound.QuestSound ,"volume":90,"pitch":100,"pan":0});
    }
    //--------------------------------------------------------------------------
    // ● 失敗効果音
    //--------------------------------------------------------------------------
    failedSound() {
        var failedMeSound = this._questMeSounds.failedSound;
        if(failedMeSound === null) return;
        if(!failedMeSound.UseQuestSound) return;
        AudioManager.playMe({"name": failedMeSound.QuestSound ,"volume":90,"pitch":100,"pan":0});
    }
}

//=============================================================================
// Quest_Data - クエストデータ
//=============================================================================

class Quest_Data {
    constructor() {
        this.initialize.apply(this, arguments);
    }
    //--------------------------------------------------------------------------
    // ● オブジェクト初期化
    //--------------------------------------------------------------------------
    initialize(index, id, quest) {
        this._id = id;
        this._index = index;
        this._checkReservedCommonEvents = [];
        this._checkLastObjAmount = [];
        this._isAllCommonExecuted = true;
        this._isCommonWaitingCheck = undefined;
        this._isAbleToReport = false;
        this.createQuests(quest);
    }
    //--------------------------------------------------------------------------
    // ● クエストデータの検査
    //--------------------------------------------------------------------------
    checkQuestData(quest) {
        //クエスト情報
        if (quest.QuestName === "") quest.QuestName = "クエスト名未設定";
        if (quest.QuestFlagID === "") quest.QuestFlagID = -1;
        if (quest.QuestIconSetting === "") quest.QuestIconSetting = { QuestIconID: -1 , QuestIconX: 0 , QuestIconY: 0 };
        if (quest.RootQuest === "") quest.RootQuest = false;
        if (quest.QuestBoardID.length === 0) quest.QuestBoardID = [0];
        if (quest.QuestCategory.length === 0) quest.QuestCategory = ['cat0'];
        if (quest.QuestDifficulty === "") quest.QuestDifficulty = { DifficultyText: "" , TextX: 0 , TextY: 0 , IconsetID: -1 };
        if (quest.QuestClient === "") {
            var picture = { UsePicture: false , PictureFile: "" , PictureX: 0 , PictureY: 0 , PictureOpacity: 255 , PictureAnchor: false };
            var sprite = { SpriteName: "" , SpriteIndex: 0 , SpriteX: 0 , SpriteY: 0 };
            quest.QuestClient = { QuestClientName: "依頼者" , QuestLocation: "依頼場所" , QuestClientPicture: picture , QuestClientSprite: sprite };
        };
        if (quest.QuestActivateSetup === "") quest.QuestActivateSetup = null;
        if (quest.QuestActivateSetup !== null) {
            if (quest.QuestActivateSetup.ActivateSelfSw.length === 0) quest.QuestActivateSetup.ActivateSelfSw = null;
            if (quest.QuestActivateSetup.ActivateSw.length === 0) quest.QuestActivateSetup.ActivateSw = null;
            if (quest.QuestActivateSetup.ActivateVal.length === 0) quest.QuestActivateSetup.ActivateVal = null;
            if (quest.QuestActivateSetup.AutoAddQuests.length === 0) quest.QuestActivateSetup.AutoAddQuests = null;
        };
        if (quest.QuestCancelSetup === "") quest.QuestCancelSetup = null;
        if (quest.QuestCancelSetup !== null) {
            if (quest.QuestCancelSetup.CancelLock === "") quest.QuestCancelSetup.CancelLock = null;
            if (quest.QuestCancelSetup.CancelSelfSw.length === 0) quest.QuestCancelSetup.CancelSelfSw = null;
            if (quest.QuestCancelSetup.CancelSw.length === 0) quest.QuestCancelSetup.CancelSw = null;
            if (quest.QuestCancelSetup.CancelVal.length === 0) quest.QuestCancelSetup.CancelVal = null;
        };
        if (quest.QuestClearedSetup === "") quest.QuestClearedSetup = null;
        if (quest.QuestClearedSetup !== null) {
            if (quest.QuestClearedSetup.ClearedCommonEvent === "") quest.QuestClearedSetup.ClearedCommonEvent = null;
            if (quest.QuestClearedSetup.ClearedSelfSw.length === 0) quest.QuestClearedSetup.ClearedSelfSw = null;
            if (quest.QuestClearedSetup.ClearedSw.length === 0) quest.QuestClearedSetup.ClearedSw = null;
            if (quest.QuestClearedSetup.ClearedVal.length === 0) quest.QuestClearedSetup.ClearedVal = null;
        };
        if (quest.QuestFailedSetup === "") quest.QuestFailedSetup = null;
        if (quest.QuestFailedSetup !== null) {
            if (quest.QuestFailedSetup.FailedCommonEvent === "") quest.QuestFailedSetup.FailedCommonEvent = null;
            if (quest.QuestFailedSetup.FailedSelfSw.length === 0) quest.QuestFailedSetup.FailedSelfSw = null;
            if (quest.QuestFailedSetup.FailedSw.length === 0) quest.QuestFailedSetup.FailedSw = null;
            if (quest.QuestFailedSetup.FailedVal.length === 0) quest.QuestFailedSetup.FailedVal = null;
        };
        //クエスト受注条件
        if (quest.ActorLevel === "") quest.ActorLevel = null;
        if (quest.NeedMembers === "") quest.NeedMembers = null;
        if (quest.OutMembers === "") quest.OutMembers = null;
        if (quest.MaxMember === "" || quest.MaxMember === 0) quest.MaxMember = null;
        if (quest.SwitchConditions === "") quest.SwitchConditions = null;
        if (quest.ValConditions === "") quest.ValConditions = null;
        if (quest.NeedAssentedQuests === "") quest.NeedAssentedQuests = null;
        if (quest.NeedClearedQuests === "") quest.NeedClearedQuests = null;
        //クエストの説明
        if (quest.PlaceInformation === "") quest.PlaceInformation = "活動エリア";
        if (quest.QuestContent === "") quest.QuestContent = "概要内容未設定";
        if (quest.QuestClearContent === "") quest.QuestClearContent = null;
        //クエスト達成時の報酬
        if (quest.QuestRewardItem === "") quest.QuestRewardItem = null;
        if (quest.QuestLoseItem === "") quest.QuestLoseItem = null;
        //クエスト目的内容
        if (quest.QuestObjectiveSettings.length !== 0){
            for (var i = 0; i < quest.QuestObjectiveSettings.length; ++ i){
                if (quest.QuestObjectiveSettings[i].ClearCommonEvent === "") quest.QuestObjectiveSettings[i].ClearCommonEvent = null;
                if (quest.QuestObjectiveSettings[i].ObjectiveContent === "") quest.QuestObjectiveSettings[i].ObjectiveContent = "目的概要未設定";
                if (quest.QuestObjectiveSettings[i].ObjectiveFinishAmount === "") quest.QuestObjectiveSettings[i].ObjectiveFinishAmount = 1;
                if (quest.QuestObjectiveSettings[i].ObjectiveID === "") quest.QuestObjectiveSettings[i].ObjectiveID = null;
                if (quest.QuestObjectiveSettings[i].ObjectiveIcons === "") quest.QuestObjectiveSettings[i].ObjectiveIcons = null;
            };
        };
        return quest;
    }
    //--------------------------------------------------------------------------
    // ● クエストデータの作成
    //--------------------------------------------------------------------------
    createQuests(quest) {
        //データチェック
        quest = this.checkQuestData(quest);
        //基本設定
        this._globalSettings = Ayatam.QUEST.GlobalSettings;
        //クエスト情報
        this._quests = quest;
        this._questName = quest.QuestName;
        this._questFlagID = quest.QuestFlagID;
        this._questRootQuest = quest.RootQuest;
        this._questIcon = quest.QuestIconSetting;
        this._questBoardId = quest.QuestBoardID;
        this._questNpcOnly = quest.NpcOnly;
        this._questCategory = quest.QuestCategory;
        this._questDifficulty = quest.QuestDifficulty;
        this._questClient = quest.QuestClient;
        this._questDailyQuest = quest.DailyQuest;
        this._questAutoReport = quest.AutoReport;
        this._questActivateSetup = quest.QuestActivateSetup;
        this._questCancelSetup = quest.QuestCancelSetup;
        this._questClearedSetup = quest.QuestClearedSetup;
        this._questFailedSetup = quest.QuestFailedSetup;
        //クエスト受注条件
        this._questActorLevel = quest.ActorLevel;
        this._questNeedMembers = quest.NeedMembers;
        this._questOutMembers = quest.OutMembers;
        this._questMaxMember = quest.MaxMember;
        this._questSwitchConditions = quest.SwitchConditions;
        this._questValConditions = quest.ValConditions;
        this._questNeedAssentedQuests = quest.NeedAssentedQuests;
        this._questNeedClearedQuests = quest.NeedClearedQuests;
        //クエストの説明
        this._questPlaceInformation = quest.PlaceInformation;
        this._questContent = quest.QuestContent;
        this._questClearContent = quest.QuestClearContent;
        //クエスト達成時の報酬
        this._questRewardGold = quest.QuestRewardGold;
        this._questLoseGold = quest.QuestLoseGold;
        this._questRewardExp = quest.QuestRewardExp;
        this._questLoseExp = quest.QuestLoseExp;
        this._questRewardItem = quest.QuestRewardItem;
        this._questLoseItem = quest.QuestLoseItem;
        //コモンイベント実行状況登録
        this._checkReservedCommonEvents = { questId: this._id , reportedCommonEvent: 0 , reportCommonActivate: false , failedCommonEvent: 0 , failedCommonActivate: false};
        //目的設定の初期化
        this._questObjectives = [null];
        //目的のセットアップの有無
        if(quest.QuestObjectiveSettings.length === 0) {
            console.error('高機能クエストシステム MV : Error :\n「' + this._id + '」の目的が一つも設定されていません。\n「' + this._id + '」`s objectives are empty please check quest database.');
            require('nw.gui').Window.get().showDevTools();
            AudioManager.playSe({ "name": "Computer", "volume": 70, "pitch": 100, "pan": 0 });
            return;
        }else{
            for (var i = 0; i < quest.QuestObjectiveSettings.length; ++i) {
                this._questObjectives['set' + (i + 1)] = new Quest_Objectives(i + 1,'set' + (i + 1),quest.QuestObjectiveSettings[i]);
                this._checkReservedCommonEvents['set' + (i + 1)] = { setId: 'set' + (i + 1), finishCommonEvent: 0 , finsihCommonActivate: false , finishCommonExecuted: false };
                this._checkLastObjAmount['set' + (i + 1)] = 0;
            };
        };
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的達成時のコモンイベント
    //--------------------------------------------------------------------------
    getObjectiveCommonEvent(setId) {
        if(this._checkReservedCommonEvents[setId].finishCommonExecuted) return;
        if($gameParty.questObjectives(this._id,setId).cleared()) {
            if($gameParty.questObjectives(this._id,setId)._finishCommonEvent !== 0) {
                this._checkReservedCommonEvents[setId].finishCommonEvent = $gameParty.questObjectives(this._id,setId)._finishCommonEvent;
                this._checkReservedCommonEvents[setId].finsihCommonActivate = true;
                this.setAllQuestCommmonExecuted(false);
            };
        };
    };
    //--------------------------------------------------------------------------
    // ● コモンイベントの未実行状態の確認
    //--------------------------------------------------------------------------
    reservedCommonExist() {
        if(this._isCommonWaitingCheck !== undefined) return this._isCommonWaitingCheck;
        var questData = Ayatam.QUEST.QuestDatabase;
        var objectives = questData[this._index-1].QuestObjectiveSettings;
        var ExecutingCommonId = 0;
        for(var set = 0; set < objectives.length; ++ set) {
            if(!this._checkReservedCommonEvents['set' + (set + 1)].finishCommonExecuted) {
                if(this._checkReservedCommonEvents['set' + (set + 1)].finsihCommonActivate) {
                    if(this._checkReservedCommonEvents['set' + (set + 1)].finishCommonEvent !== 0) {
                        var sobjCommoneEvent = this._checkReservedCommonEvents['set' + (set + 1)].finishCommonEvent;
                        ExecutingCommonId = sobjCommoneEvent;
                        this._isCommonWaitingCheck = { id: this._id , target: 'set' , setId: 'set' + (set + 1) , commonId: sobjCommoneEvent};
                        break;
                    };
                };
            };
        };
        if(this._isCommonWaitingCheck === undefined) {
            if(ExecutingCommonId === 0) {
                if(this._checkReservedCommonEvents.reportCommonActivate) {
                    if(this._checkReservedCommonEvents.reportedCommonEvent !== 0) {
                        var sreportCommonEvent = this._checkReservedCommonEvents.reportedCommonEvent;
                        ExecutingCommonId = sreportCommonEvent;
                        this._isCommonWaitingCheck = { id: this._id , target: 'report' , setId: false , commonId: sreportCommonEvent};
                    };
                };
            };
            if(this._globalSettings.FailingQuestMode) {
                if(ExecutingCommonId === 0) {
                    if(this._checkReservedCommonEvents.failedCommonEvent !== 0) {
                        if(this._checkReservedCommonEvents.failedCommonActivate) {
                            var sfailedCommonEvent = this._checkReservedCommonEvents.failedCommonEvent;
                            ExecutingCommonId = sfailedCommonEvent;
                            this._isCommonWaitingCheck = { id: this._id , target: 'failed' , setId: false , commonId: sfailedCommonEvent};
                        };
                    };
                };
            };
        };
        if(this._isCommonWaitingCheck === undefined) {
            if(ExecutingCommonId === 0) this.setAllQuestCommmonExecuted(true);
        };
    }
    //--------------------------------------------------------------------------
    // ● コモンイベントの実行フラグの実行済み化
    //--------------------------------------------------------------------------
    commonEventHasExecuted(reservedCommonInfo) {
        if(reservedCommonInfo.target === 'set') {
            this._checkReservedCommonEvents[reservedCommonInfo.setId].finsihCommonActivate = false;
            this._checkReservedCommonEvents[reservedCommonInfo.setId].finishCommonExecuted = true;
            this._checkReservedCommonEvents[reservedCommonInfo.setId].finishCommonEvent = 0;
        }else if(reservedCommonInfo.target === 'report') {
            this._checkReservedCommonEvents.reportCommonActivate = false;
            this._checkReservedCommonEvents.reportedCommonEvent = 0;
        }else if(reservedCommonInfo.target === 'failed') {
            this._checkReservedCommonEvents.failedCommonActivate = false;
            this._checkReservedCommonEvents.failedCommonEvent = 0;
        };
        this._isCommonWaitingCheck = undefined;
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的達成時のコモンイベントの初期化
    //--------------------------------------------------------------------------
    resetObjectiveCommonEvent(setId) {
        this._checkReservedCommonEvents[setId].finishCommonExecuted = false;
        this._checkReservedCommonEvents[setId].finsihCommonActivate = false;
        this._checkReservedCommonEvents[setId].finishCommonEvent = 0;
    };
    //--------------------------------------------------------------------------
    // ● クエストの報告時/失敗時のコモンイベントの初期化
    //--------------------------------------------------------------------------
    resetQuestCommonEvent() {
        this._checkReservedCommonEvents.reportCommonActivate = false;
        this._checkReservedCommonEvents.reportedCommonEvent = 0;
        this._checkReservedCommonEvents.failedCommonActivate = false;
        this._checkReservedCommonEvents.failedCommonEvent = 0;
        this.setAllQuestCommmonExecuted(true);
    };
    //--------------------------------------------------------------------------
    // ● 予約中のコモンイベントが実行済み状況を取得
    //--------------------------------------------------------------------------
    setAllQuestCommmonExecuted(executed) {
        this._isAllCommonExecuted = executed;
    }
    //--------------------------------------------------------------------------
    // ● 予約中のコモンイベントが実行済みか？
    //--------------------------------------------------------------------------
    allQuestCommonExecuted() {
        return this._isAllCommonExecuted;
    }
    //--------------------------------------------------------------------------
    // ● 目的最終獲得情報の保存
    //--------------------------------------------------------------------------
    setLastObjAmount(setId,amount) {
        this._checkLastObjAmount[setId] = amount;
    }
    //--------------------------------------------------------------------------
    // ● 目的最終獲得情報の参照
    //--------------------------------------------------------------------------
    getLastObjAmount(setId) {
        return this._checkLastObjAmount[setId];
    }
    //--------------------------------------------------------------------------
    // ● クエストのID
    //--------------------------------------------------------------------------
    questId() {
        return this._id;
    }
    //--------------------------------------------------------------------------
    // ● クエストアイコンのID
    //--------------------------------------------------------------------------
    questIcon() {
        if(this._questIcon === null) return 0;
        return this._questIcon.QuestIconID;
    }
    //--------------------------------------------------------------------------
    // ● ルートクエストか
    //--------------------------------------------------------------------------
    isRootQuest() {
        return this._questRootQuest;
    }
    //--------------------------------------------------------------------------
    // ● ルートクエストか
    //--------------------------------------------------------------------------
    questCategory() {
        return this._questCategory;
    }
    //--------------------------------------------------------------------------
    // ● クエストのNPC限定か
    //--------------------------------------------------------------------------
    questOnlyNpc() {
        return this._questNpcOnly;
    }
    //--------------------------------------------------------------------------
    // ● クエストの自動報告か
    //--------------------------------------------------------------------------
    questAutoReport() {
        return this._questAutoReport;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注後のセットアップ
    //--------------------------------------------------------------------------
    questAssentedSetup() {
        return this._questActivateSetup;
    }
    //--------------------------------------------------------------------------
    // ● クエストの放棄後のセットアップ
    //--------------------------------------------------------------------------
    questCanceledSetup() {
        return this._questCancelSetup;
    }
    //--------------------------------------------------------------------------
    // ● クエストの報告後のセットアップ
    //--------------------------------------------------------------------------
    questReportedSetup() {
        return this._questClearedSetup;
    }
    //--------------------------------------------------------------------------
    // ● クエストの失敗後のセットアップ
    //--------------------------------------------------------------------------
    questFailedSetup() {
        return this._questFailedSetup;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「アクターレベル」
    //--------------------------------------------------------------------------
    questActorLevel() {
        return this._questActorLevel;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「必須メンバー」
    //--------------------------------------------------------------------------
    questNeededActors() {
        return this._questNeedMembers;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「除外メンバー」
    //--------------------------------------------------------------------------
    questOutedActors() {
        return this._questOutMembers;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「上限人数」
    //--------------------------------------------------------------------------
    questMaxMember() {
        return this._questMaxMember;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「スイッチ状況」
    //--------------------------------------------------------------------------
    questSwitchConditions() {
        return this._questSwitchConditions;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「変数状況」
    //--------------------------------------------------------------------------
    questValConditions() {
        return this._questValConditions;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「クエスト受注状況」
    //--------------------------------------------------------------------------
    questNeedAssentedQuests() {
        return this._questNeedAssentedQuests;
    }
    //--------------------------------------------------------------------------
    // ● クエストの受注条件「クエスト報告状況」
    //--------------------------------------------------------------------------
    questNeedReportedQuests() {
        return this._questNeedClearedQuests;
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的参照
    //--------------------------------------------------------------------------
    questObjectives() {
        return this._questObjectives;
    }
    //--------------------------------------------------------------------------
    // ● クエストの目的指定参照
    //--------------------------------------------------------------------------
    getObjective(setId) {
        return this.questObjectives()[setId];
    }
    //--------------------------------------------------------------------------
    // ● クエストの報酬「お金」
    //--------------------------------------------------------------------------
    rewardGold() {
        return this._questRewardGold;
    }
    //--------------------------------------------------------------------------
    // ● クエストの減る報酬「お金」
    //--------------------------------------------------------------------------
    loseGold() {
        return this._questLoseGold;
    }
    //--------------------------------------------------------------------------
    // ● クエストの報酬「経験値」
    //--------------------------------------------------------------------------
    rewardExp() {
        return this._questRewardExp;
    }
    //--------------------------------------------------------------------------
    // ● クエストの減る報酬「経験値」
    //--------------------------------------------------------------------------
    loseExp() {
        return this._questLoseExp;
    }
    //--------------------------------------------------------------------------
    // ● クエストの報酬「アイテム」
    //--------------------------------------------------------------------------
    rewardItems() {
        return this._questRewardItem;
    }
    //--------------------------------------------------------------------------
    // ● クエストの減る報酬「アイテム」
    //--------------------------------------------------------------------------
    loseItems() {
        return this._questLoseItem;
    }
    //--------------------------------------------------------------------------
    // ● クエストの報告可能状況の設定
    //--------------------------------------------------------------------------
    setAbleToReport(con) {
        this._isAbleToReport = con;
    }
    //--------------------------------------------------------------------------
    // ● クエストの報告可能状況
    //--------------------------------------------------------------------------
    isAbleToReport() {
        return this._isAbleToReport;
    }
}

//=============================================================================
// Quest_Objectives - クエスト目的データ
//=============================================================================

class Quest_Objectives {
    constructor() {
        this.initialize.apply(this,arguments);
    }
    //--------------------------------------------------------------------------
    // ● オブジェクト初期化
    //--------------------------------------------------------------------------
    initialize(index,id,content) {
        this._id = id;
        this._index = index;
        this._objectiveIcons = content.ObjectiveIcons;
        this._contentType = content.ObjectiveTypes;
        this._contentId = 0;
        this._itemSelect = null;
        if(this._contentType === 'killquest') {
            this._contentId = content.ObjectiveID.TargetEnemyID;
        }else if(this._contentType === 'valquest') {
            this._contentId = content.ObjectiveID.TargetValID;
        }else if(this._contentType === 'itemquest') {
            this._itemSelect = content.ObjectiveID.TargetItemID.UseWitchItem;
            if(this._itemSelect === 'Item') {
                this._contentId = content.ObjectiveID.TargetItemID.SelectedItem;
            }else if(this._itemSelect === 'Weapon') {
                this._contentId = content.ObjectiveID.TargetItemID.SelectedWeapon;
            }else if(this._itemSelect === 'Armor') {
                this._contentId = content.ObjectiveID.TargetItemID.SelectedArmor;
            };
        }else if(this._contentType === 'selectedquestcleared') {
            this._contentId = 'quest' + content.ObjectiveID.TargetQuestID;
        };
        this._content = content.ObjectiveContent;
        this._target = 0;
        this._finishAmount = content.ObjectiveFinishAmount;
        this._finishCommonEvent = content.ClearCommonEvent;
    }
    //--------------------------------------------------------------------------
    // ● クリア目的数の参照
    //--------------------------------------------------------------------------
    getClearAmount() {
        return this._finishAmount;
    }
    //--------------------------------------------------------------------------
    // ● クリア目的数の変更
    //--------------------------------------------------------------------------
    changeClearAmount(Amount) {
        this._finishAmount = Amount;
    }
    //--------------------------------------------------------------------------
    // ● クリアしているか？
    //--------------------------------------------------------------------------
    cleared() {
        return this._target >= this._finishAmount;
    }
}

//=============================================================================
// Window_HelpForQuest - クエスト専用ヘルプウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエスト専用ヘルプウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_HelpForQuest() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
}

Window_HelpForQuest.prototype = Object.create(Window_Base.prototype);
Window_HelpForQuest.prototype.constructor = Window_HelpForQuest;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_HelpForQuest.prototype.initialize = function(numLines) {
        var x = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowX;
        var y = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowY;
        var width = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowWidth;
        var height = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowHeight;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.opacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowOpacity;
        this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowBackOpacity;
        this._text = '';
        this._globalSettings = Ayatam.QUEST.GlobalSettings;
        this.winSkin();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_HelpForQuest.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowX - 3; 
        rect.y = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowY - 3;
        rect.width = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowWidth;
        rect.height = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowHeight;
        Window_Base.prototype.initialize.call(this, rect);
        this.opacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowOpacity;
        this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowBackOpacity;
        this._text = '';
        this._globalSettings = Ayatam.QUEST.GlobalSettings;
        this.winSkin();
    };
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_HelpForQuest.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestMenuImg.UsePicture) return;
    this._spriteMenuBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestMenuImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteMenuBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteMenuBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteMenuBg.x = -(Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowX - 10) + Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestMenuImg.PictureX;
    this._spriteMenuBg.y = -(Ayatam.QUEST.CustamizeSettings.MenuWindow.HelpWindowY - 10) + Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestMenuImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestMenuImg.Anchor) {
        this._spriteMenuBg.anchor.x = 0.5;
        this._spriteMenuBg.anchor.y = 0.5;
    };
    this._spriteMenuBg.opacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestMenuImg.PictureOpacity;
    this.addChildToBack(this._spriteMenuBg);
};
//--------------------------------------------------------------------------
// ● テキストの設定
//--------------------------------------------------------------------------
Window_HelpForQuest.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};
//--------------------------------------------------------------------------
// ● クリア
//--------------------------------------------------------------------------
Window_HelpForQuest.prototype.clear = function() {
    this.setText('');
};
//--------------------------------------------------------------------------
// ● アイテムの設定 「スキル/アイテム等」
//--------------------------------------------------------------------------
Window_HelpForQuest.prototype.setItem = function(item) {
    this.setText(item ? item.description : '');
};
//--------------------------------------------------------------------------
// ● リフレッシュ
//--------------------------------------------------------------------------
Window_HelpForQuest.prototype.refresh = function() {
    this.contents.clear();
    if(Ayatam.QUEST.GlobalSettings !== undefined) {
        if(Ayatam.QUEST.GlobalSettings.FontSetup !== "") {
            if(Ayatam.QUEST.GlobalSettings.FontSetup.FontName !== "") this.contents.fontFace = Ayatam.QUEST.GlobalSettings.FontSetup.FontName;
        };
    };
    this.contents.fontSize = 14;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.drawTextEx(this._text, this.textPadding(), 0);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        const rect = this.baseTextRect();
        this.drawTextEx(this._text, rect.x, rect.y, rect.width);
    };
};
//--------------------------------------------------------------------------
// ● drawTextEx - Window_HelpForQuest専用化
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Window_HelpForQuest.prototype.drawTextEx = function(text, x, y) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_HelpForQuest.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
};

//=============================================================================
// Window_QuestIconHorzCommand - クエストアイコンコマンドウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストアイコンコマンドウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestIconHorzCommand() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestIconHorzCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_QuestIconHorzCommand.prototype.constructor = Window_QuestIconHorzCommand;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestIconHorzCommand.prototype.initialize = function(x,y) {
        Window_HorzCommand.prototype.initialize.call(this,x,y);
        this._cursorFixed = false;
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestIconHorzCommand.prototype.initialize = function(rect) {
        Window_HorzCommand.prototype.initialize.call(this,rect);
        this._cursorFixed = false;
    };
};
//--------------------------------------------------------------------------
// ● isHoverEnabled - MZ用 Window_QuestIconHorzCommand専用化
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MZ") {
    Window_QuestIconHorzCommand.prototype.isHoverEnabled = function() {
        return false;
    };
};
//--------------------------------------------------------------------------
// ● drawBackgroundRect - MZ用 Window_QuestIconHorzCommand専用化
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MZ") {
    Window_QuestIconHorzCommand.prototype.drawBackgroundRect = function(rect) {
        const c1 = ColorManager.itemBackColor1();
        const c2 = ColorManager.itemBackColor2();
        const x = 0;
        const y = 0;
        const w = 0;
        const h = 0;
        this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
        this.contentsBack.strokeRect(x, y, w, h, c1);
    };
};
//--------------------------------------------------------------------------
// ● 行数の取得
//--------------------------------------------------------------------------
Window_QuestIconHorzCommand.prototype.maxCols = function() {
    if(Ayatam.QUEST.GlobalSettings.FailingQuestMode) return 4;
    if(!Ayatam.QUEST.GlobalSettings.FailingQuestMode) return 3;
};
//--------------------------------------------------------------------------
// ● 有効状態を取得
//--------------------------------------------------------------------------
Window_QuestIconHorzCommand.prototype.indexEnabled = function(index) {
    return this._index === index;
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_QuestIconHorzCommand.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    this.contents.clearRect(rect);
    this.indexEnabled(index) ? this.changePaintOpacity(true) : this.changePaintOpacity(false);
    this.drawIcon(this._list[index].ext,rect.x,rect.y);
};
//--------------------------------------------------------------------------
// ● itemWidth - クエストアイコンコマンドウィンドウ専用化
//--------------------------------------------------------------------------
Window_QuestIconHorzCommand.prototype.itemWidth = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        if(Ayatam.QUEST.GlobalSettings.FailingQuestMode) {
            return Math.floor((this.width - this.padding * 2 +
                               this.spacing()) / 3.50 - this.spacing());
        }else{
            return Math.floor((this.width - this.padding * 2 +
                               this.spacing()) / 2.35 - this.spacing());
        };
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        if(Ayatam.QUEST.GlobalSettings.FailingQuestMode) {
            return Math.floor((this.windowWidth() - this.padding * 2 +
                               12) / 3.50 - 12);
        }else{
            return Math.floor((this.windowWidth() - this.padding * 2 +
                               12) / 2.35 - 12);
        };
    };
};
//--------------------------------------------------------------------------
// ● itemRect - MZ時のitemRectの調整
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MZ") {
    Window_QuestIconHorzCommand.prototype.itemRect = function(index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = this.itemWidth();
        rect.height = 36;
        rect.x = index % maxCols * (rect.width + 12) - this._scrollX;
        rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
        return rect;
    };
};
//--------------------------------------------------------------------------
// ● updateCursor - クエストアイコンコマンドウィンドウ専用化
//--------------------------------------------------------------------------
Window_QuestIconHorzCommand.prototype.updateCursor = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        Window_Selectable.prototype.updateCursor.call(this);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        Window_Selectable.prototype.refreshCursor.call(this);
    };
    this.setCursorRect(0, 0, 0, 0);
};
//--------------------------------------------------------------------------
// ● updateArrows - クエストアイコンコマンドウィンドウ専用化
//--------------------------------------------------------------------------
Window_QuestIconHorzCommand.prototype.updateArrows = function() {
    this.downArrowVisible = false;
    this.upArrowVisible = false;
};
//--------------------------------------------------------------------------
// ● select - クエストアイコンコマンドウィンドウ専用化
//--------------------------------------------------------------------------
Window_QuestIconHorzCommand.prototype.select = function(index) {
    this._index = index;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._stayCount = 0;
        this.ensureCursorVisible();
        this.updateCursor();
    };
    this.callUpdateHelp();
    this.refresh();
};

//=============================================================================
// Window_QuestCategory - クエストカテゴリーウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストカテゴリーウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestCategory() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestCategory.prototype = Object.create(Window_QuestIconHorzCommand.prototype);
Window_QuestCategory.prototype.constructor = Window_QuestCategory;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestCategory.prototype.initialize = function(x = 0, y = 0) {
        var x = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryX;
        var y = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryY;
        Window_QuestIconHorzCommand.prototype.initialize.call(this,x,y);
        this.opacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryOpacity;
        this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryBackOpacity;
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestCategory.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryX - 3;
        rect.y = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryY - 3;
        rect.width = this.windowWidth();
        rect.height = this.windowHeight();
        Window_QuestIconHorzCommand.prototype.initialize.call(this,rect);
        this.opacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryOpacity;
        this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryBackOpacity;
    };
};
//--------------------------------------------------------------------------
// ● クエストカテゴリーの設定
//--------------------------------------------------------------------------
Window_QuestCategory.prototype.setCategory = function(category) {
    if(this._questCategorySmybols.includes(category)) this._index = this._questCategorySmybols.indexOf(category);
};
//--------------------------------------------------------------------------
// ● コマンドリストの作成
//--------------------------------------------------------------------------
Window_QuestCategory.prototype.makeCommandList = function() {
    if(this._questCategoryIcons === undefined) this._questCategoryIcons = [Ayatam.QUEST.GlobalSettings.QuestMenuConditionCategory.CategoryIconAll,Ayatam.QUEST.GlobalSettings.QuestMenuConditionCategory.CategoryIconActive,Ayatam.QUEST.GlobalSettings.QuestMenuConditionCategory.CategoryIconCleared,Ayatam.QUEST.GlobalSettings.QuestMenuConditionCategory.CategoryIconFailed];
    if(this._questModeFailing === undefined) this._questModeFailing = Ayatam.QUEST.GlobalSettings.FailingQuestMode;
    if(this._questCategorySmybols === undefined) this._questModeFailing ? this._questCategorySmybols = ['cat0','cat1','cat2','cat3'] : this._questCategorySmybols = ['cat0','cat1','cat2'];
    this._questCategorySmybols.forEach(symbol => {
        var id = symbol.split('cat');
        this.addCommand('',symbol,false,this._questCategoryIcons[id[1]]);
    });
};
//--------------------------------------------------------------------------
// ● クエストカテゴリーウィンドウの幅
//--------------------------------------------------------------------------
Window_QuestCategory.prototype.windowWidth = function() {
    return Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryWidth;
};
//--------------------------------------------------------------------------
// ● クエストカテゴリーウィンドウの幅
//--------------------------------------------------------------------------
Window_QuestCategory.prototype.windowHeight = function() {
    return Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryHeight;
};

//=============================================================================
// Window_QuestCategoryLabel - クエストカテゴリーラベルウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストカテゴリーラベルウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestCategoryLabel() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestCategoryLabel.prototype = Object.create(Window_Selectable.prototype);
Window_QuestCategoryLabel.prototype.constructor = Window_QuestCategoryLabel;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestCategoryLabel.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelX, y = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelY, width = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelWidth, height = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelHeight){
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.setupQuestCategoryLabel();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestCategoryLabel.prototype.initialize = function(rect){
        rect.x = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelX - 9;
        rect.y = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelY - 3;
        rect.width = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelWidth;
        rect.height = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelHeight;
        Window_Selectable.prototype.initialize.call(this, rect);
        this.setupQuestCategoryLabel();
        this._isWindow = false;
    };
};
//--------------------------------------------------------------------------
// ● クエストカテゴリーラベル用のセットアップ
//--------------------------------------------------------------------------
Window_QuestCategoryLabel.prototype.setupQuestCategoryLabel = function() {
    this._questCategoryLabels = [Ayatam.QUEST.GlobalSettings.QuestMenuConditionCategory.CategoryNameAll,Ayatam.QUEST.GlobalSettings.QuestMenuConditionCategory.CategoryNameActive,Ayatam.QUEST.GlobalSettings.QuestMenuConditionCategory.CategoryNameCleared,Ayatam.QUEST.GlobalSettings.QuestMenuConditionCategory.CategoryNameFailed];
    this._category = null;
    this.opacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.IconCategoryLabelBackOpacity;
};
//--------------------------------------------------------------------------
// ● クエストカテゴリーラベルの設定
//--------------------------------------------------------------------------
Window_QuestCategoryLabel.prototype.setCategory = function(category) {
    if(this._questCategoryLabels === undefined) return;
    if(this._category === category) return;
    this._category = category;
    var id = category.split('cat');
    this.refresh(this._questCategoryLabels[id[1]]);
};
//--------------------------------------------------------------------------
// ● クエストカテゴリーラベルの refresh を変更
//--------------------------------------------------------------------------
Window_QuestCategoryLabel.prototype.refresh = function(Label = 'なし') {
    this.contents.clear();
    if(Ayatam.QUEST.GlobalSettings !== undefined) {
        if(Ayatam.QUEST.GlobalSettings.FontSetup !== "") {
            if(Ayatam.QUEST.GlobalSettings.FontSetup.FontName !== "") this.contents.fontFace = Ayatam.QUEST.GlobalSettings.FontSetup.FontName;
            this.contents.fontSize = Ayatam.QUEST.GlobalSettings.FontSetup.FontSize;
        };
    };
    this.drawText(Label,0,0,this.contents.width,'center');
};

//=============================================================================
// Window_QuestFilterCategory - クエストフィルターカテゴリーウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストフィルターカテゴリーウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestFilterCategory() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestFilterCategory.prototype = Object.create(Window_Command.prototype);
Window_QuestFilterCategory.prototype.constructor = Window_QuestFilterCategory;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestFilterCategory.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterX,y = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterY) {
        Window_Command.prototype.initialize.call(this,x,y);
        this.setupFilterData();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestFilterCategory.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterX;
        rect.y = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterY;
        var filters = Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory.CategoryName;
        rect.width = 240;
        rect.height = this.fittingHeight(filters.length);
        Window_Command.prototype.initialize.call(this,rect);
        this._isWindow = false;
        this.setupFilterData();
    };
};
//--------------------------------------------------------------------------
// ● クエストフィルターカテゴリーウィンドウ用のセットアップ
//--------------------------------------------------------------------------
Window_QuestFilterCategory.prototype.setupFilterData = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackOpacity;
    this.winSkin();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_QuestFilterCategory.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackImg.UsePicture) return;
    this._spriteFilterBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteFilterBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteFilterBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteFilterBg.x = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackImg.PictureX;
    this._spriteFilterBg.y = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackImg.Anchor) {
        this._spriteFilterBg.anchor.x = 0.5;
        this._spriteFilterBg.anchor.y = 0.5;
    };
    this._spriteFilterBg.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.FilterBackImg.PictureOpacity;
    this.addChildToBack(this._spriteFilterBg);
};
//--------------------------------------------------------------------------
// ● フィルタリングの設定
//--------------------------------------------------------------------------
Window_QuestFilterCategory.prototype.setFilter = function(filter) {
    if(Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory.CategoryID.includes(filter)) this._index = Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory.CategoryID.indexOf(filter);
};
//--------------------------------------------------------------------------
// ● 表示行数の取得
//--------------------------------------------------------------------------
Window_QuestFilterCategory.prototype.numVisibleRows = function() {
    return this.maxItems();
};
//--------------------------------------------------------------------------
// ● コマンドリストの作成
//--------------------------------------------------------------------------
Window_QuestFilterCategory.prototype.makeCommandList = function() {
    Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory.CategoryID.forEach(symbol => {
        var id = symbol.split('cat');
        this.addCommand(Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory.CategoryName[id[1]],symbol,true);
    });
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_QuestFilterCategory.prototype.drawItem = function(index) {
    if(Utils.RPGMAKER_NAME === "MV") {
        var rect = this.itemRectForText(index);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var rect = this.itemLineRect(index);
    };
    var align = 'center';
    this.resetTextColor();
    if(Ayatam.QUEST.GlobalSettings !== undefined) {
        if(Ayatam.QUEST.GlobalSettings.FontSetup !== "") {
            if(Ayatam.QUEST.GlobalSettings.FontSetup.FontName !== "") this.contents.fontFace = Ayatam.QUEST.GlobalSettings.FontSetup.FontName;
            this.contents.fontSize = Ayatam.QUEST.GlobalSettings.FontSetup.FontSize;
        };
    };
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

//=============================================================================
// Window_MenuQuestList - クエストリストのウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストリストのウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_MenuQuestList() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_MenuQuestList.prototype = Object.create(Window_ItemList.prototype);
Window_MenuQuestList.prototype.constructor = Window_MenuQuestList;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_MenuQuestList.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListX,y = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListY,width = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListWidth,height = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListHeight) {
        Window_ItemList.prototype.initialize.call(this,x,y,width,height);
        this.setupQuestList();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_MenuQuestList.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListX - 3;
        rect.y = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListY - 3;
        rect.width = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListWidth;
        rect.height = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListHeight;
        Window_ItemList.prototype.initialize.call(this,rect);
        this.setupQuestList();
    };
};
//--------------------------------------------------------------------------
// ● クエストリスト用のセットアップ
//--------------------------------------------------------------------------
Window_MenuQuestList.prototype.setupQuestList = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestListBackOpacity;
    this._data = [];
    this._questModeFailing = Ayatam.QUEST.GlobalSettings.FailingQuestMode;
    this._category = null;
    this._filter = null;
};
//--------------------------------------------------------------------------
// ● クエストカテゴリーの設定
//--------------------------------------------------------------------------
Window_MenuQuestList.prototype.setCategory = function(category) {
    if(this._category === category) return;
    this._category = category;
    this.select(0);
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエストフィルタリングの設定
//--------------------------------------------------------------------------
Window_MenuQuestList.prototype.setFilter = function(filter) {
    if(this._filter === filter) return;
    this._filter = filter;
    this.select(0);
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエストリストの作成
//--------------------------------------------------------------------------
Window_MenuQuestList.prototype.makeItemList = function() {
    this._data = [];
    var QuestLists = $gameQuest.getAllQuests();
    var id = 0;
    QuestLists.forEach(quest => {
        ++id;
        if(this._questModeFailing) {//失敗モード
            if(this._category === 'cat0') {//All
                if(this._filter === 'cat0') {//フィルタリングのAll
                    if($gameQuest.isAssented('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                }else if($gameQuest.questCategory('quest' + id).includes(this._filter)) {//その他の一致フィルタリング
                    if($gameQuest.isAssented('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                };
            }else if(this._category === 'cat1'){//進行中
                if(this._filter === 'cat0') {//フィルタリングのAll
                    if($gameQuest.isAssented('quest' + id) && !$gameQuest.isFailed('quest' + id) && !$gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                }else if($gameQuest.questCategory('quest' + id).includes(this._filter)) {//その他の一致フィルタリング
                    if($gameQuest.isAssented('quest' + id) && !$gameQuest.isFailed('quest' + id) && !$gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                };
            }else if(this._category === 'cat2'){//クリア済み
                if(this._filter === 'cat0') {//フィルタリングのAll
                    if($gameQuest.isAssented('quest' + id) && !$gameQuest.isFailed('quest' + id) && $gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                }else if($gameQuest.questCategory('quest' + id).includes(this._filter)) {//その他の一致フィルタリング
                    if($gameQuest.isAssented('quest' + id) && !$gameQuest.isFailed('quest' + id) && $gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                };
            }else if(this._category === 'cat3'){//失敗
                if(this._filter === 'cat0') {//フィルタリングのAll
                    if($gameQuest.isAssented('quest' + id) && $gameQuest.isFailed('quest' + id) && !$gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                }else if($gameQuest.questCategory('quest' + id).includes(this._filter)) {//その他の一致フィルタリング
                    if($gameQuest.isAssented('quest' + id) && $gameQuest.isFailed('quest' + id) && !$gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                };
            };
        }else{//通常モード
            if(this._category === 'cat0') {//All
                if(this._filter === 'cat0') {//フィルタリングのAll
                    if($gameQuest.isAssented('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                }else if($gameQuest.questCategory('quest' + id).includes(this._filter)) {//その他の一致フィルタリング
                    if($gameQuest.isAssented('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                };
            }else if(this._category === 'cat1'){//進行中
                if(this._filter === 'cat0') {//フィルタリングのAll
                    if($gameQuest.isAssented('quest' + id) && !$gameQuest.isFailed('quest' + id) && !$gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                }else if($gameQuest.questCategory('quest' + id).includes(this._filter)) {//その他の一致フィルタリング
                    if($gameQuest.isAssented('quest' + id) && !$gameQuest.isFailed('quest' + id) && !$gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                };
            }else if(this._category === 'cat2'){//クリア済み
                if(this._filter === 'cat0') {//フィルタリングのAll
                    if($gameQuest.isAssented('quest' + id) && !$gameQuest.isFailed('quest' + id) && $gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                }else if($gameQuest.questCategory('quest' + id).includes(this._filter)) {//その他の一致フィルタリング
                    if($gameQuest.isAssented('quest' + id) && !$gameQuest.isFailed('quest' + id) && $gameQuest.isReported('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
                };
            };
        };
    });
    if(this._data.length === 0) this._data.push(null);
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_MenuQuestList.prototype.drawItem = function(index) {
    if(this._data === null) return;
    if(Ayatam.QUEST.GlobalSettings !== undefined) {
        if(Ayatam.QUEST.GlobalSettings.FontSetup !== "") {
            if(Ayatam.QUEST.GlobalSettings.FontSetup.FontName !== "") this.contents.fontFace = Ayatam.QUEST.GlobalSettings.FontSetup.FontName;
            this.contents.fontSize = Ayatam.QUEST.GlobalSettings.FontSetup.FontSize;
        };
    };
    var item = this._data[index];
    if(Utils.RPGMAKER_NAME === "MV") {
        var rect = this.itemRectForText(index);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var rect = this.itemLineRect(index);
    };
    var icons = Ayatam.QUEST.GlobalSettings.QuestConditionIcons;
    if(item) {
        this.changePaintOpacity(true);
        if(this._questModeFailing){//失敗モード
            if($gameQuest.isAssented(item._id) && !$gameQuest.isFailed(item._id) && !$gameQuest.isReported(item._id)) {
                this.drawIcon(icons[0],rect.x,rect.y)
                this.changePaintOpacity(true);
            };
            if(!$gameQuest.isFailed(item._id) && $gameQuest.isReported(item._id)) {
                this.drawIcon(icons[1],rect.x,rect.y);
                this.changePaintOpacity(false);
            };
            if($gameQuest.isFailed(item._id) && !$gameQuest.isReported(item._id)) {
                this.drawIcon(icons[2],rect.x,rect.y);
                this.changePaintOpacity(false);
            };
            rect.x += 34;
        }else{//通常モード
            if($gameQuest.isAssented(item._id) && !$gameQuest.isReported(item._id)) {
                this.drawIcon(icons[0],rect.x,rect.y);
                this.changePaintOpacity(true);
            };
            if($gameQuest.isReported(item._id)) {
                this.drawIcon(icons[1],rect.x,rect.y);
                this.changePaintOpacity(false);
            };
            rect.x += 34;
        };
        this.resetTextColor();
        if($gameParty.getNav() === item._id) {
            if(item._questIcon.QuestIconID !== -1) {
                this.drawIcon(item._questIcon.QuestIconID,rect.x,rect.y);
                rect.x += 36;
            };
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.NaviColor);
        }else{
            if(item._questIcon.QuestIconID !== -1) {
                this.drawIcon(item._questIcon.QuestIconID,rect.x,rect.y);
                rect.x += 36;
            };
        };
        this.drawText(item._questName,rect.x,rect.y,this.contents.width);
    };
};
//--------------------------------------------------------------------------
// ● 桁数の取得
//--------------------------------------------------------------------------
Window_MenuQuestList.prototype.maxCols = function() {
    return 1;
};

//=============================================================================
// Window_QuestMapNavigation - クエストナビゲーションウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストナビゲーションウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestMapNavigation() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestMapNavigation.prototype = Object.create(Window_Base.prototype);
Window_QuestMapNavigation.prototype.constructor = Window_QuestMapNavigation;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestMapNavigation.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.NavWindow.NavX, y = Ayatam.QUEST.CustamizeSettings.NavWindow.NavY, width = Ayatam.QUEST.CustamizeSettings.NavWindow.NavWidth, height = Ayatam.QUEST.CustamizeSettings.NavWindow.NavHeight) {
        Window_Base.prototype.initialize.call(this,x,y,width,height);
        this.setupQuestNav();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestMapNavigation.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.NavWindow.NavX;
        rect.y = Ayatam.QUEST.CustamizeSettings.NavWindow.NavY;
        rect.width = Ayatam.QUEST.CustamizeSettings.NavWindow.NavWidth;
        rect.height = Ayatam.QUEST.CustamizeSettings.NavWindow.NavHeight;
        Window_Base.prototype.initialize.call(this,rect);
        this._isWindow = false;
        this.setupQuestNav();
    };
};
//--------------------------------------------------------------------------
// ● クエストナビゲーション用のセットアップ
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.setupQuestNav = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.NavWindow.NavOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackOpacity;
    this.visible = false;
    this._globalSettings = Ayatam.QUEST.GlobalSettings;
    if($gameTemp.canselNavDraw() === undefined) $gameTemp.canselNavDrawFlag(false);
    this._questData = null;
    this._questId = null;
    this._checkContents = false;
    this._needContentRefresh = false;
    this._addY = 0;
    this._bgY = 0;
    this.winSkin();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.UsePicture) return;
    this._spriteNavBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteNavBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteNavBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteNavBg.x = Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.PictureX;
    this._spriteNavBg.y = Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.Anchor) {
        this._spriteNavBg.anchor.x = 0.5;
        this._spriteNavBg.anchor.y = 0.5;
    };
    this._spriteNavBg.opacity = Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.PictureOpacity;
    this.addChildToBack(this._spriteNavBg);
};
//--------------------------------------------------------------------------
// ● フレームの更新
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if(!$gameQuest.questInNavi()) {
        if(this._oldContents !== this._checkContents){
            this.contents.clear();
            this._oldContents = this._checkContents;
        };
    }else{
        this._checkContents = true;
    };
    if($gameTemp.canselNavDraw()) return;
    this.checkNavCondition();
};
//--------------------------------------------------------------------------
// ● ナビゲーターの内容更新
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.needRefresh = function() {
    this._needContentRefresh = true;
};
//--------------------------------------------------------------------------
// ● ナビゲーターの状態確認
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.checkNavCondition = function() {
    this.visible = $gameQuest.questInNavi();
    if(!this.visible) return;
    this.setupNavData();
    this.drawNavContents();
};
//--------------------------------------------------------------------------
// ● ナビゲーターのデーターセットアップ
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.setupNavData = function() {
    if(this._questId === $gameParty.getNav()) return;
    this._questData = $gameQuest.findQuest($gameParty.getNav());
    this._questId = $gameParty.getNav();
    this._needContentRefresh = true;
    if(!$gameQuest.questInNavi()) this.contents.clear();
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.drawNavContents = function() {
    if(!this._needContentRefresh) return;
    this.contents.clear();
    if(this._globalSettings !== undefined) {
        if(this._globalSettings.FontSetup !== "") {
            if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
        };
    };
    this._addY = 10;
    if(!$gameQuest.isAssented(this._questId) && $gameQuest.isReported(this._questId)) return;
    this.drawNavBackground();
    this.drawQuestTitle();
    this.drawQuestPlace();
    this.drawQuestObjectives();
    this._needContentRefresh = false;
};
//--------------------------------------------------------------------------
// ● 簡易背景の作成
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.drawNavBackground = function() {
    if(Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.UsePicture) return;
    this.getBgSize();
    var colour = '#000000';
    this.contents.paintOpacity = 127;
    this.contents.fillRect(0,0,this.contents.width,this._bgY,colour);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 簡易背景の大きさを取得
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.getBgSize = function() {
    this._bgY = 14;
    if($gameQuest.getAllObjectives(this._questId) !== null) {
        var objectives = $gameQuest.getAllObjectives(this._questId);
    }else{
        var objectives = [];
    };
    if(this._questData._questName !== "クエスト名未設定") this._bgY += this.lineHeight();
    if(this._questData._questPlaceInformation !== "") this._bgY += this.lineHeight() + 5;
    if(objectives.length !== 0) this._bgY += this.lineHeight()*objectives.length;
    if(this._questData._questClearContent !== null || this._questData._questClearContent !== "") this._bgY += this.lineHeight();
};
//--------------------------------------------------------------------------
// ● クエスト名の描画
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.drawQuestTitle = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
    this.contents.outlineWidth = 5;
    this.drawIcon(this._questData._questIcon.QuestIconID,this.contents.width - this.contents.width + 10 + Ayatam.QUEST.CustamizeSettings.NavData.QuestNameX,this._addY + Ayatam.QUEST.CustamizeSettings.NavData.QuestNameY);
    this.drawText(this._questData._questName,this.contents.width - this.contents.width + 10 + 36 + Ayatam.QUEST.CustamizeSettings.NavData.QuestNameX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.NavData.QuestNameY,this.contents.width);
    this._addY += this.lineHeight() + 5;
    if(!Ayatam.QUEST.CustamizeSettings.NavWindow.NavBackImg.UsePicture) this.contents.fillRect(0,this._addY,this.contents.width,1,designColor);
    this._addY += 5;
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 活動エリアの描画
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.drawQuestPlace = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataQuestAreaLabel !== null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.AreaColor);
        this.drawIcon(this._globalSettings.QuestDataQuestAreaLabel.LocationLabelIcon,10 + Ayatam.QUEST.CustamizeSettings.NavData.AreaLabelX,this._addY + Ayatam.QUEST.CustamizeSettings.NavData.AreaLabelY);
        this.drawText(this._questData._questPlaceInformation,8 + 36 + 4 + Ayatam.QUEST.CustamizeSettings.NavData.AreaX,this._addY - 1 + Ayatam.QUEST.CustamizeSettings.NavData.AreaY,this.contents.width);
    };
    this._addY += this.lineHeight() + 5;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 目的の描画
//--------------------------------------------------------------------------
Window_QuestMapNavigation.prototype.drawQuestObjectives = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    var textState = { index: 0 };
    var customX = Ayatam.QUEST.CustamizeSettings.NavData.ObjectiveX;
    var customY = Ayatam.QUEST.CustamizeSettings.NavData.ObjectiveY;
    var textLines = [];
    var textLineHeight = 0;
    if($gameQuest.getAllObjectives(this._questId) !== null) {
        var objectiveLists = $gameQuest.getAllObjectives(this._questId);
    }else{
        var objectiveLists = [];
    };
    if(!this._questData.isRootQuest()) {//通常クエスト
        var clearCheck = 0;
        var addX = 0;
        objectiveLists.forEach(obj => {
            if(textLines.length > 1) this._addY -= textLineHeight;
            if(this._questModeFailing) {//失敗モード時
                if($gameQuest.isFailed(this._questId)) {//クエスト失敗時
                    clearCheck = 0;
                    this.changePaintOpacity(true);
                    if(obj._objectiveIcons.ObjectiveFailedIcon !== 0){
                        this.drawIcon(obj._objectiveIcons.ObjectiveFailedIcon,10 + customX,this._addY + customY);
                        addX += 36;
                    }else{
                        if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                            this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                            addX += 36;
                        };
                    };
                    textState.text = this.convertEscapeCharacters(obj._content);
                    textLines = textState.text.split('\n');
                    if(textLines.length > 1) {
                        textLineHeight = this.calcTextHeight(textState,true);
                    }else{
                        textLineHeight = this.calcTextHeight(textState,false);
                    };
                    this.changePaintOpacity(false);
                    this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                }else{//クエスト進行時
                    if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                        clearCheck = 1;
                        this.changePaintOpacity(true);
                        if(obj._objectiveIcons.ObjectiveClearedIcon !== 0){
                            this.drawIcon(obj._objectiveIcons.ObjectiveClearedIcon,10 + customX,this._addY + customY);
                            addX += 36;
                        }else{
                            if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                                addX += 36;
                            };
                        };
                        textState.text = this.convertEscapeCharacters(obj._content);
                        textLines = textState.text.split('\n');
                        if(textLines.length > 1) {
                            textLineHeight = this.calcTextHeight(textState,true);
                        }else{
                            textLineHeight = this.calcTextHeight(textState,false);
                        };
                        this.changePaintOpacity(false);
                        this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                    }else{//対象オブジェクト未クリア
                        clearCheck = 0;
                        this.changePaintOpacity(true);
                        if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0){
                            this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                            addX += 36;
                        };
                        textState.text = this.convertEscapeCharacters(obj._content);
                        textLines = textState.text.split('\n');
                        if(textLines.length > 1) {
                            textLineHeight = this.calcTextHeight(textState,true);
                        }else{
                            textLineHeight = this.calcTextHeight(textState,false);
                        };
                        this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                    };
                };
                this.drawText(obj._target + '/' + obj._finishAmount,-2 + customX,this._addY - 2 + customY,this.contents.width,'right');
                addX = 0;
                if(textLines.length > 1) {
                    this._addY += this.lineHeight() + textLineHeight + 16;
                }else{
                    this._addY += this.lineHeight();
                };
            }else{//通常モード時
                if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                    clearCheck = 1;
                    this.changePaintOpacity(true);
                    if(obj._objectiveIcons.ObjectiveClearedIcon !== 0){
                        this.drawIcon(obj._objectiveIcons.ObjectiveClearedIcon,10 + customX,this._addY + customY);
                        addX += 36;
                    }else{
                        if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                            this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                            addX += 36;
                        };
                    };
                    textState.text = this.convertEscapeCharacters(obj._content);
                    textLines = textState.text.split('\n');
                    if(textLines.length > 1) {
                        textLineHeight = this.calcTextHeight(textState,true);
                    }else{
                        textLineHeight = this.calcTextHeight(textState,false);
                    };
                    this.changePaintOpacity(false);
                    this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                }else{//対象オブジェクト未クリア
                    clearCheck = 0;
                    this.changePaintOpacity(true);
                    if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0){
                        this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                        addX += 36;
                    };
                    textState.text = this.convertEscapeCharacters(obj._content);
                    textLines = textState.text.split('\n');
                    if(textLines.length > 1) {
                        textLineHeight = this.calcTextHeight(textState,true);
                    }else{
                        textLineHeight = this.calcTextHeight(textState,false);
                    };
                    this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                };
                this.drawText(obj._target + '/' + obj._finishAmount,-2 + customX,this._addY - 2 + customY,this.contents.width,'right');
                addX = 0;
                if(textLines.length > 1) {
                    this._addY += this.lineHeight() + textLineHeight + 16;
                }else{
                    this._addY += this.lineHeight();
                };
            };
        });
        if(this._questData._questClearContent !== null) {
            if(clearCheck === 0) {
                this.changePaintOpacity(false);
                this.resetTextColor();
            }else{
                if($gameQuest.isReported(this._questId)) {
                    this.changePaintOpacity(false);
                    this.resetTextColor();
                }else{
                    this.changePaintOpacity(true);
                    this.resetTextColor();
                };
            };
            this.drawText(this._questData._questClearContent,addX + 10 + customX,this._addY - 2 + customY,this.contents.width);
            this._addY += this.lineHeight();
        };
    }else{//ルートクエスト
        var clearCheck = 0;
        var addX = 0;
        var canBreak = false;
        objectiveLists.forEach(obj => {
            if(!canBreak) {
                if(this._questModeFailing) {//失敗モード時
                    if($gameQuest.isFailed(this._questId)) {
                        if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                            clearCheck = 1;
                            this.changePaintOpacity(true);
                            if(obj._objectiveIcons.ObjectiveFailedIcon !== 0){
                                this.drawIcon(obj._objectiveIcons.ObjectiveFailedIcon,10 + customX,this._addY + customY);
                                addX += 36;
                            }else{
                                if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                    this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                                    addX += 36;
                                };
                            };
                            textState.text = this.convertEscapeCharacters(obj._content);
                            textLines = textState.text.split('\n');
                            if(textLines.length > 1) {
                                textLineHeight = this.calcTextHeight(textState,true);
                            }else{
                                textLineHeight = this.calcTextHeight(textState,false);
                            };
                            this.changePaintOpacity(false);
                            this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                        }else{//対象オブジェクト未クリア
                            canBreak = true;
                            clearCheck = 0;
                            this.changePaintOpacity(true);
                            if(obj._objectiveIcons.ObjectiveFailedIcon !== 0){
                                this.drawIcon(obj._objectiveIcons.ObjectiveFailedIcon,10 + customX,this._addY + customY);
                                addX += 36;
                            }else{
                                if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                    this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                                    addX += 36;
                                };
                            };
                            textState.text = this.convertEscapeCharacters(obj._content);
                            textLines = textState.text.split('\n');
                            if(textLines.length > 1) {
                                textLineHeight = this.calcTextHeight(textState,true);
                            }else{
                                textLineHeight = this.calcTextHeight(textState,false);
                            };
                            this.changePaintOpacity(false);
                            this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                        };
                    }else{
                        if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                            clearCheck = 1;
                            this.changePaintOpacity(true);
                            if(obj._objectiveIcons.ObjectiveClearedIcon !== 0){
                                this.drawIcon(obj._objectiveIcons.ObjectiveClearedIcon,10 + customX,this._addY + customY);
                                addX += 36;
                            }else{
                                if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                    this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                                    addX += 36;
                                };
                            };
                            textState.text = this.convertEscapeCharacters(obj._content);
                            textLines = textState.text.split('\n');
                            if(textLines.length > 1) {
                                textLineHeight = this.calcTextHeight(textState,true);
                            }else{
                                textLineHeight = this.calcTextHeight(textState,false);
                            };
                            this.changePaintOpacity(false);
                            this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                        }else{//対象オブジェクト未クリア
                            canBreak = true;
                            clearCheck = 0;
                            this.changePaintOpacity(true);
                            if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0){
                                this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                                addX += 36;
                            };
                            textState.text = this.convertEscapeCharacters(obj._content);
                            textLines = textState.text.split('\n');
                            if(textLines.length > 1) {
                                textLineHeight = this.calcTextHeight(textState,true);
                            }else{
                                textLineHeight = this.calcTextHeight(textState,false);
                            };
                            this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                        };
                    };
                }else{//通常モード時
                    if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                        clearCheck = 1;
                        this.changePaintOpacity(true);
                        if(obj._objectiveIcons.ObjectiveClearedIcon !== 0){
                            this.drawIcon(obj._objectiveIcons.ObjectiveClearedIcon,10 + customX,this._addY + customY);
                            addX += 36;
                        }else{
                            if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                                addX += 36;
                            };
                        };
                        textState.text = this.convertEscapeCharacters(obj._content);
                        textLines = textState.text.split('\n');
                        if(textLines.length > 1) {
                            textLineHeight = this.calcTextHeight(textState,true);
                        }else{
                            textLineHeight = this.calcTextHeight(textState,false);
                        };
                        this.changePaintOpacity(false);
                        this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                    }else{//対象オブジェクト未クリア
                        canBreak = true;
                        clearCheck = 0;
                        this.changePaintOpacity(true);
                        if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0){
                            this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10 + customX,this._addY + customY);
                            addX += 36;
                        };
                        textState.text = this.convertEscapeCharacters(obj._content);
                        textLines = textState.text.split('\n');
                        if(textLines.length > 1) {
                            textLineHeight = this.calcTextHeight(textState,true);
                        }else{
                            textLineHeight = this.calcTextHeight(textState,false);
                        };
                        this.drawTextEx(obj._content,addX + 10 + customX,this._addY + 4 + customY,this.contents.width);
                    };
                };
                this.drawText(obj._target + '/' + obj._finishAmount,-2 + customX,this._addY - 2 + customY,this.contents.width,'right');
                addX = 0;
                if(textLines.length > 1) {
                    this._addY += textLineHeight + 5;
                }else{
                    this._addY += this.lineHeight();
                };
            };
        });
        if(this._questData._questClearContent !== null) {
            if(clearCheck === 0) {
                this.changePaintOpacity(false);
                this.resetTextColor();
            }else{
                if($gameQuest.isReported(this._questId)) {
                    this.changePaintOpacity(false);
                    this.resetTextColor();
                }else{
                    this.changePaintOpacity(true);
                    this.resetTextColor();
                };
            };
            this.drawText(this._questData._questClearContent,addX + 10 + customX,this._addY - 2 + customY,this.contents.width);
            this._addY += this.lineHeight();
        };
    };
    this.changePaintOpacity(true);
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};
//--------------------------------------------------------------------------
// ● drawTextEx - Window_QuestMapNavigation専用化
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestMapNavigation.prototype.drawTextEx = function(text, x, y) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestMapNavigation.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
};

//=============================================================================
// Window_QuestBoard - クエストボードウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストボードウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestBoard() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestBoard.prototype = Object.create(Window_Selectable.prototype);
Window_QuestBoard.prototype.constructor = Window_QuestBoard;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestBoard.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainX,y = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainY,width = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainWidth,height = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainHeight) {
        Window_Selectable.prototype.initialize.call(this,x,y,width,height);
        this.setupQuestBoard();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestBoard.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainX - 3;
        rect.y = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainY - 3;
        rect.width = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainWidth;
        rect.height = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainHeight;
        Window_Selectable.prototype.initialize.call(this,rect);
        this._isWindow = false;
        this.setupQuestBoard();
    };
};
//--------------------------------------------------------------------------
// ● クエストボード用のセットアップ
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.setupQuestBoard = function() {
    this.winSkin();
    this.opacity = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainBackOpacity;
    this._globalSettings = Ayatam.QUEST.GlobalSettings;
    this._showQuestMode = false;
    this._boardTitle = this._globalSettings.QuestBoardName;
    this._newBoardTitle = this._boardTitle;
    this._addY = 0;
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.BoardWindow.BoardBackImg.UsePicture) return;
    this._spriteBoardBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.BoardWindow.BoardBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteBoardBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteBoardBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteBoardBg.x = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainX + Ayatam.QUEST.CustamizeSettings.BoardWindow.BoardBackImg.PictureX;
    this._spriteBoardBg.y = Ayatam.QUEST.CustamizeSettings.BoardWindow.MainY + Ayatam.QUEST.CustamizeSettings.BoardWindow.BoardBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.BoardWindow.BoardBackImg.Anchor) {
        this._spriteBoardBg.anchor.x = 0.5;
        this._spriteBoardBg.anchor.y = 0.5;
    };
    this._spriteBoardBg.opacity = Ayatam.QUEST.CustamizeSettings.BoardWindow.BoardBackImg.PictureOpacity;
    this.addChildToBack(this._spriteBoardBg);
};
//--------------------------------------------------------------------------
// ● クエストボードの名前取得
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.setBoardTitle = function(title) {
    if(this._newBoardTitle === title) return;
    if(title === null) {
        this._newBoardTitle = this._boardTitle;
    }else{
        this._newBoardTitle = title;
    };
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエスト受注操作の取得
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.setShowQuest = function(showQuest) {
    if(this._showQuestMode === showQuest) return;
    this._showQuestMode = showQuest;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエスト受注操作の参照
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.isShowQuest = function() {
    return this._showQuestMode;
};
//--------------------------------------------------------------------------
// ● 受注条件1ページ目ウィンドウの refresh を変更
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.refresh = function() {
    this.contents.clear();
    this._addY = 0;
    this.drawBoardDesign();
    this.drawBoardTitle();
    this.drawQuestLabels();
};
//--------------------------------------------------------------------------
// ● 簡易デザインの描画 
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.drawBoardDesign = function() {
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseAll) return;
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseBoard) return;
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    var colour = '#000000';
    this.contents.paintOpacity = 127;
    this.contents.fillRect(0,0,this.contents.width,Ayatam.QUEST.CustamizeSettings.BoardSet.Set1,colour);
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.BoardSet.Set2,this.contents.width,Ayatam.QUEST.CustamizeSettings.BoardSet.Set3,colour);
    this.contents.paintOpacity = 255;
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.BoardSet.Set4,this.contents.width,1,designColor);
    this.drawListBackground();
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.BoardSet.Set5,this.contents.width,1,designColor);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● リスト背景の描画 
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.drawListBackground = function() {
    var colour = '#000000';
    this.contents.paintOpacity = 127;
    this.contents.fillRect(0,80,this.contents.width,this.contents.height - 110,colour);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● ボードタイトルの描画 
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.drawBoardTitle = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    this.contents.fontSize = Ayatam.QUEST.CustamizeSettings.BoardData.titleFontSize;
    this.contents.outlineWidth = 5;
    this.drawText(this._newBoardTitle,0 + Ayatam.QUEST.CustamizeSettings.BoardData.titleX,this._addY + Ayatam.QUEST.CustamizeSettings.BoardData.titleY,this.contents.width);
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● クエストラベルの描画 
//--------------------------------------------------------------------------
Window_QuestBoard.prototype.drawQuestLabels = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
    if(this._globalSettings.QuestBoardListLabels !== undefined || this._globalSettings.QuestBoardListLabels.length !== 0) {
        this.drawText(this._globalSettings.QuestBoardListLabels[0],Ayatam.QUEST.CustamizeSettings.BoardData.questNameX,this._addY + Ayatam.QUEST.CustamizeSettings.BoardData.allLabelY,this.contents.width);
        this.drawText(this._globalSettings.QuestBoardListLabels[1],Ayatam.QUEST.CustamizeSettings.BoardData.questNameX + Ayatam.QUEST.CustamizeSettings.BoardData.questCategoryX,this._addY + Ayatam.QUEST.CustamizeSettings.BoardData.allLabelY,this.contents.width);
        this.drawText(this._globalSettings.QuestBoardListLabels[2],Ayatam.QUEST.CustamizeSettings.BoardData.questNameX + Ayatam.QUEST.CustamizeSettings.BoardData.questCategoryX + Ayatam.QUEST.CustamizeSettings.BoardData.questDifficultyX,this._addY + Ayatam.QUEST.CustamizeSettings.BoardData.allLabelY,this.contents.width);
    }else{
        this.drawText('クエスト名',Ayatam.QUEST.CustamizeSettings.BoardData.questNameX,this._addY + Ayatam.QUEST.CustamizeSettings.BoardData.allLabelY,this.contents.width);
        this.drawText('カテゴリー',Ayatam.QUEST.CustamizeSettings.BoardData.questNameX + Ayatam.QUEST.CustamizeSettings.BoardData.questCategoryX,this._addY + Ayatam.QUEST.CustamizeSettings.BoardData.allLabelY,this.contents.width);
        this.drawText('難易度',Ayatam.QUEST.CustamizeSettings.BoardData.questNameX + Ayatam.QUEST.CustamizeSettings.BoardData.questCategoryX + Ayatam.QUEST.CustamizeSettings.BoardData.questDifficultyX,this._addY + Ayatam.QUEST.CustamizeSettings.BoardData.allLabelY,this.contents.width);
    };
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};

//=============================================================================
// Window_QuestBoardList - クエストボードリストウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストボードリストウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestBoardList() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestBoardList.prototype = Object.create(Window_ItemList.prototype);
Window_QuestBoardList.prototype.constructor = Window_QuestBoardList;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestBoardList.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListX,y = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListY,width = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListWidth,height = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListHeight) {
        Window_ItemList.prototype.initialize.call(this,x,y,width,height);
        this.setupBoardList();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestBoardList.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListX - 3;
        rect.y = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListY - 3;
        rect.width = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListWidth;
        rect.height = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListHeight
        Window_ItemList.prototype.initialize.call(this,rect);
        this._isWindow = false;
        this.setupBoardList();
    };
};
//--------------------------------------------------------------------------
// ● ボードリスト用のセットアップ
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.setupBoardList = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.BoardWindow.ListBackOpacity;
    this._data = [];
    this._boardId = 0;
    this._questListMode = false;
};
//--------------------------------------------------------------------------
// ● ボードリスト用のセットアップ
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.setBoardId = function(boardId) {
    if(this._boardId === boardId) return;
    this._boardId = boardId;
};
//--------------------------------------------------------------------------
// ● クエスト受注表示方法の取得
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.setListMode = function(listMode) {
    if(this._questListMode === listMode) return;
    this._questListMode = listMode;
};
//--------------------------------------------------------------------------
// ● クエスト受注表示方法の参照
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.isListMode = function() {
    return this._questListMode;
};
//--------------------------------------------------------------------------
// ● クエストリストの作成
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.makeItemList = function() {
    this._data = [];
    var QuestLists = $gameQuest.getAllQuests();
    var id = 0;
    QuestLists.forEach(quest => {
        ++id;
        if(this._boardId === 0) {//All
            if(this._questListMode === 0) {//リストモード0 すべての表示条件を検査
                if($gameQuest.canBoardShow('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
            }else if(this._questListMode === 1) {//リストモード1 アクターレベルのみ検査
                if($gameQuest.canBoardShowActorLevel('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
            }else if(this._questListMode === 2) {//リストモード2 NPC限定以外をすべて表示
                if($gameQuest.canBoardShowAll('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
            };
        }else if(quest.QuestBoardID.includes(this._boardId)){//対象クエストボードID
            if(this._questListMode === 0) {//リストモード0 すべての表示条件を検査
                if($gameQuest.canBoardShow('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
            }else if(this._questListMode === 1) {//リストモード1 アクターレベルのみ検査
                if($gameQuest.canBoardShowActorLevel('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
            }else if(this._questListMode === 2) {//リストモード2 NPC限定以外をすべて表示
                if($gameQuest.canBoardShowAll('quest' + id)) this._data.push($gameQuest.findQuest('quest' + id));
            };
        };
    });
    if(this._data.length === 0) this._data.push(null);
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.drawItem = function(index) {
    if(this._data === null) return;
    if(Ayatam.QUEST.GlobalSettings.FontSetup !== null) {
        if(Ayatam.QUEST.GlobalSettings.FontSetup.FontName !== "") this.contents.fontFace = Ayatam.QUEST.GlobalSettings.FontSetup.FontName;
    };
    if(Ayatam.QUEST.GlobalSettings.FontSetup !== null) {
        this.contents.fontSize = Ayatam.QUEST.GlobalSettings.FontSetup.FontSize;
    };
    var item = this._data[index];
    if(Utils.RPGMAKER_NAME === "MV") {
        var rect = this.itemRectForText(index);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var rect = this.itemLineRect(index);
    };
    rect.y += 2;
    var categoryLists = [];
    if(item) {
        this.drawIcon(item._questIcon.QuestIconID,rect.x + Ayatam.QUEST.CustamizeSettings.BoardData.listNameX,rect.y);
        rect.x += 34 + Ayatam.QUEST.CustamizeSettings.BoardData.listNameX;
        this.resetTextColor();
        this.drawText(item._questName,rect.x,rect.y,this.contents.width);
        rect.x += 350 + Ayatam.QUEST.CustamizeSettings.BoardData.listCategoryX;
        if(Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory !== undefined || Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory !== "") {
            if(Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory.CategoryName !== undefined || Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory.CategoryName.length !== 0) {
                if(item._questCategory !== null || item._questCategory.length !== 0) {
                    item._questCategory.forEach(cat => {
                        var category = cat.split('cat');
                        categoryLists.push(Ayatam.QUEST.GlobalSettings.QuestMenuQuestCategory.CategoryName[category[1]]);
                    });
                };
            };
        };
        if(categoryLists.length !== 0) {
            var lists = categoryLists.join(' ');
            var listsSize = this.textWidth(lists);
        }else{
            var lists = '未設定';
            var listsSize = 0;
        };
        this.drawText(lists,rect.x - (listsSize/2),rect.y,this.contents.width);
        rect.x += 230 + Ayatam.QUEST.CustamizeSettings.BoardData.listDifficultyX;
        if(item._questDifficulty !== null) {
            if(Ayatam.QUEST.GlobalSettings.QuestDataDifficultySetup !== "") {
                var Icons = Ayatam.QUEST.GlobalSettings.QuestDataDifficultySetup.IconPacks[item._questDifficulty.IconsetID];
                var checkIcons = [...String(Icons)];
                if(checkIcons.includes(',')) {
                    var IconList = Icons.split(',')
                    var countIcon = 0;
                    IconList.forEach(icon => {
                        this.drawIcon(icon,rect.x + countIcon,rect.y);
                        countIcon += -26;
                    });
                }else{
                    this.drawIcon(Icons,rect.x,rect.y);
                };
            };
            if(Ayatam.QUEST.GlobalSettings.QuestDataDifficultySetup.TextColor !== "") {
                if(Utils.RPGMAKER_NAME === "MV") {
                    this.changeTextColor(this.textColor(Ayatam.QUEST.GlobalSettings.QuestDataDifficultySetup.TextColor));
                }else if(Utils.RPGMAKER_NAME === "MZ"){
                    this.changeTextColor(ColorManager.textColor(Ayatam.QUEST.GlobalSettings.QuestDataDifficultySetup.TextColor));
                };
            };
            if(item._questDifficulty.DifficultyText !== "") {
                var textWidth = this.textWidth(item._questDifficulty.DifficultyText);
                this.drawText(item._questDifficulty.DifficultyText,rect.x - textWidth - 8,rect.y + 5,this.contents.width);
            };
        };
        this.resetTextColor();
    };
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 桁数の取得
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.maxCols = function() {
    return 1;
};
//--------------------------------------------------------------------------
// ● 選択項目の有効状態を取得
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.isCurrentItemEnabled = function() {
    return true;
};
//--------------------------------------------------------------------------
// ● playOkSound - Window_QuestBoardList専用化
//--------------------------------------------------------------------------
Window_QuestBoardList.prototype.playOkSound = function() {
    if(this.item() === null) {
        SoundManager.playBuzzer();
    }else{
        SoundManager.playOk();
    };
};

//=============================================================================
// Window_CheckQuestMust - クエストの受注条件1ページ目ウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストの受注条件1ページ目ウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_CheckQuestMust() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_CheckQuestMust.prototype = Object.create(Window_Selectable.prototype);
Window_CheckQuestMust.prototype.constructor = Window_CheckQuestMust;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_CheckQuestMust.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.MustWindow.MainX,y = Ayatam.QUEST.CustamizeSettings.MustWindow.MainY,width = Ayatam.QUEST.CustamizeSettings.MustWindow.MainWidth,height = Ayatam.QUEST.CustamizeSettings.MustWindow.MainHeight) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.setupQuestPageOne();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_CheckQuestMust.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.MustWindow.MainX;
        rect.y = Ayatam.QUEST.CustamizeSettings.MustWindow.MainY;
        rect.width = Ayatam.QUEST.CustamizeSettings.MustWindow.MainWidth;
        rect.height = Ayatam.QUEST.CustamizeSettings.MustWindow.MainHeight;
        Window_Selectable.prototype.initialize.call(this, rect);
        this._isWindow = false;
        this.setupQuestPageOne();
    };
};
//--------------------------------------------------------------------------
// ● 受注条件1ページ目用のセットアップ
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.setupQuestPageOne = function() {
    this.winSkin();
    this.opacity = Ayatam.QUEST.CustamizeSettings.MustWindow.MainOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MustWindow.MainBackOpacity;
    this._globalSettings = Ayatam.QUEST.GlobalSettings;
    this._questData = null;
    this._questId = null;
    this._board = false;
    this._showQuestMode = false;
    this._mainAddX = 0;
    this._mainAddY = 0;
    this._QuestTitleAddX = 0;
    this._QuestTitleAddY = 0;
    this._difficultyAddX = 0;
    this._difficultyAddY = 0;
    this._questNameAddX = 0;
    this._questNameAddY = 0;
    this._maxMemberAddX = 0;
    this._maxMemberAddY = 0;
    this._actorLevelAddX = 0;
    this._actorLevelAddY = 0;
    this._actorNeedAddX = 0;
    this._actorNeedAddY = 0;
    this._actorOutAddX = 0;
    this._actorOutAddY = 0;
    this._addY = 0;
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.MustWindow.MustBackImg.UsePicture) return;
    this._spriteMustBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.MustWindow.MustBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteMustBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteMustBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteMustBg.x = Ayatam.QUEST.CustamizeSettings.MustWindow.MainX + Ayatam.QUEST.CustamizeSettings.MustWindow.MustBackImg.PictureX;
    this._spriteMustBg.y = Ayatam.QUEST.CustamizeSettings.MustWindow.MainY + Ayatam.QUEST.CustamizeSettings.MustWindow.MustBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.MustWindow.MustBackImg.Anchor) {
        this._spriteMustBg.anchor.x = 0.5;
        this._spriteMustBg.anchor.y = 0.5;
    };
    this._spriteMustBg.opacity = Ayatam.QUEST.CustamizeSettings.MustWindow.MustBackImg.PictureOpacity;
    this.addChildToBack(this._spriteMustBg);
};
//--------------------------------------------------------------------------
// ● クエストデータの読み込み
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.setQuest = function(quest) {
    if(this._questData === quest) return;
    this._questData = quest;
    if(quest !== null) this._questId = quest._id;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエストデータの参照
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.questData = function() {
    return this._questData;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスかを保存
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.setBoard = function(isBoard) {
    if(this._board === isBoard) return;
    this._board = isBoard;
    if(this._board) this.backOpacity = 255;
    if(!this._board) this.backOpacity = 192;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスを参照
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.fromBoard = function() {
    return this._board;
};
//--------------------------------------------------------------------------
// ● クエスト受注操作の取得
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.setShowQuest = function(showQuest) {
    if(this._showQuestMode === showQuest) return;
    this._showQuestMode = showQuest;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエスト受注操作の参照
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.isShowQuest = function() {
    return this._showQuestMode;
};
//--------------------------------------------------------------------------
// ● 受注条件1ページ目ウィンドウの refresh を変更
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.refresh = function() {
    this.contents.clear();
    if(this._questData === null) return;
    this._mainAddX = 0;
    this._mainAddY = 0;
    this._QuestTitleAddX = Ayatam.QUEST.CustamizeSettings.MustData.flagX;
    this._QuestTitleAddY = Ayatam.QUEST.CustamizeSettings.MustData.flagY;
    this._difficultyAddX = Ayatam.QUEST.CustamizeSettings.MustData.questDifficultyX;
    this._difficultyAddY = Ayatam.QUEST.CustamizeSettings.MustData.questDifficultyY;
    this._questNameAddX = Ayatam.QUEST.CustamizeSettings.MustData.questNameX;
    this._questNameAddY = Ayatam.QUEST.CustamizeSettings.MustData.questNameY;
    this._maxMemberAddX = Ayatam.QUEST.CustamizeSettings.MustData.maxMemberX;
    this._maxMemberAddY = Ayatam.QUEST.CustamizeSettings.MustData.maxMemberY;
    this._actorLevelAddX = Ayatam.QUEST.CustamizeSettings.MustData.actorLevelX;
    this._actorLevelAddY = Ayatam.QUEST.CustamizeSettings.MustData.actorLevelY;
    this._actorNeedAddX = Ayatam.QUEST.CustamizeSettings.MustData.actorNeedX;
    this._actorNeedAddY = Ayatam.QUEST.CustamizeSettings.MustData.actorNeedY;
    this._actorOutAddX = Ayatam.QUEST.CustamizeSettings.MustData.actorOutX;
    this._actorOutAddY = Ayatam.QUEST.CustamizeSettings.MustData.actorOutY;
    this._addY = 0;
    this.drawAllDesigns();
    this.drawFlag();
    this.drawDifficulty();
    this.drawQuestName();
    this.drawMaxMember();
    this.drawNeedActorLevel();
    this.drawNeedMember();
    this.drawOutMember();
};
//--------------------------------------------------------------------------
// ● 簡易デザインの描画 
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawAllDesigns = function() {
    this.drawUpperDesign();
    this.drawActorLevelDesign();
    this.drawNeededMemberDesign();
    this.drawOutedMemberDesign();
};
//--------------------------------------------------------------------------
// ● 簡易デザインの描画 「上部」
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawUpperDesign = function() {
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseAll) return;
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseNeeded) return;
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    var colour = '#000000';
    this.contents.paintOpacity = 127;
    this.contents.fillRect(0,0,this.contents.width,Ayatam.QUEST.CustamizeSettings.NeededSet.Set1,colour);
    this.contents.paintOpacity = 255;
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.NeededSet.Set2,this.contents.width,1,designColor);
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.NeededSet.Set3,this.contents.width,1,designColor);
    this.contents.fillRect(Ayatam.QUEST.CustamizeSettings.NeededSet.Set4,Ayatam.QUEST.CustamizeSettings.NeededSet.Set5,Ayatam.QUEST.CustamizeSettings.NeededSet.Set6,1,designColor);
    this.contents.fillRect(Ayatam.QUEST.CustamizeSettings.NeededSet.Set7,Ayatam.QUEST.CustamizeSettings.NeededSet.Set8,Ayatam.QUEST.CustamizeSettings.NeededSet.Set9,1,designColor);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 簡易デザインの描画 「アクターレベル」
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawActorLevelDesign = function() {
    var colour = '#000000';
    this.contents.paintOpacity = 127;
    var textState = { index:0 };
    var actorLvlBgY = this._mainAddY + this._actorLevelAddY + 126;
    if(this._questData._questActorLevel === null) return;
    this._questData._questActorLevel.forEach(actor => {
        textState.text = this.convertEscapeCharacters($gameActors.actor(actor.Actor)._name);
        textState.height = this.calcTextHeight(textState,false);
        this.contents.fillRect(this._actorLevelAddX,actorLvlBgY,this.contents.width,textState.height - 16,colour);
        actorLvlBgY += textState.height - 12;
    });
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 簡易デザインの描画 「必須メンバー」
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawNeededMemberDesign = function() {
    this.contents.paintOpacity = 255;
    var textState = { index:0 };
    var actorNeedBgY = this._mainAddY + this._actorNeedAddY + 126;
    if(Utils.RPGMAKER_NAME === "MV") {
        var colour = this.textColor(24);
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var colour = ColorManager.textColor(24);
        var designColor = ColorManager.textColor(16);
    };
    if(Ayatam.QUEST.CustamizeSettings.WindowSets.UseAll) {
        if(Ayatam.QUEST.CustamizeSettings.WindowSets.UseNeeded) {
            this.contents.fillRect(Ayatam.QUEST.CustamizeSettings.NeededSet.Set10,this._actorNeedAddY + Ayatam.QUEST.CustamizeSettings.NeededSet.Set11,Ayatam.QUEST.CustamizeSettings.NeededSet.Set12,1,designColor);
        };
    };
    actorNeedBgY -= 76;
    if(this._questData._questNeedMembers === null) return;
    this.contents.paintOpacity = 127;
    this._questData._questNeedMembers.forEach(actor => {
        textState.text = this.convertEscapeCharacters($gameActors.actor(actor)._name);
        textState.height = this.calcTextHeight(textState,false);
        this.contents.fillRect(this._mainAddX + this._actorNeedAddX,actorNeedBgY,170,37,colour);
        actorNeedBgY += textState.height + 3;
    });
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 簡易デザインの描画 「除外メンバー」
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawOutedMemberDesign = function() {
    this.contents.paintOpacity = 255;
    var textState = { index:0 };
    var actorOutBgY = this._mainAddY + this._actorOutAddY + 126;
    if(Utils.RPGMAKER_NAME === "MV") {
        var colour = this.textColor(18);
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var colour = ColorManager.textColor(18);
        var designColor = ColorManager.textColor(16);
    };
    if(Ayatam.QUEST.CustamizeSettings.WindowSets.UseAll) {
        if(Ayatam.QUEST.CustamizeSettings.WindowSets.UseNeeded) {
            this.contents.fillRect(this._actorOutAddX + Ayatam.QUEST.CustamizeSettings.NeededSet.Set13,this._actorOutAddY + Ayatam.QUEST.CustamizeSettings.NeededSet.Set14,Ayatam.QUEST.CustamizeSettings.NeededSet.Set15,1,designColor);
        };
    };
    actorOutBgY -= 76;
    if(this._questData._questOutMembers === null) return;
    this.contents.paintOpacity = 127;
    this._questData._questOutMembers.forEach(actor => {
        textState.text = this.convertEscapeCharacters($gameActors.actor(actor)._name);
        textState.height = this.calcTextHeight(textState,false);
        this.contents.fillRect(this._mainAddX + this._actorOutAddX,actorOutBgY,190,37,colour);
        actorOutBgY += textState.height + 3;
    });
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● フラッグの描画
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawFlag = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._questData._questIcon !== null) {
        if(this._questData._questIcon.QuestIconID !== -1) {
            this.drawIcon(this._questData._questIcon.QuestIconID,this._mainAddX + this._QuestTitleAddX + this._questData._questIcon.QuestIconX,this._mainAddY + this._QuestTitleAddY + this._addY + this._questData._questIcon.QuestIconY);
        };
    };
    if(this._questData._questFlagID !== null) {
        if(this._globalSettings.QuestFlags !== "" || this._globalSettings.QuestFlags.length !== 0) {
            this.contents.fontSize = Ayatam.QUEST.CustamizeSettings.MustData.flagFontSize;
            this.contents.outlineWidth = 5;
            this.drawText(this._globalSettings.QuestFlags[this._questData._questFlagID],this._mainAddX + this._QuestTitleAddX + 34,this._mainAddY + this._QuestTitleAddY + this._addY -2,this.contents.width);
        };
    };
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 難易度の描画
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawDifficulty = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._questData._questDifficulty !== null) {
        if(this._globalSettings.QuestDataDifficultySetup !== "") {
            var Icons = this._globalSettings.QuestDataDifficultySetup.IconPacks[this._questData._questDifficulty.IconsetID];
            var checkIcons = [...String(Icons)];
            if(checkIcons.includes(',')) {
                var IconList = Icons.split(',');
                var countIcon = 0;
                IconList.forEach(icon => {
                    this.drawIcon(icon,this._mainAddX + this._difficultyAddX + 340 + countIcon,this._mainAddY + this._difficultyAddY + this._addY);
                    countIcon += -26;
                });
            }else{
                this.drawIcon(Icons,this._mainAddX + this._difficultyAddX + 340,this._mainAddY + this._difficultyAddY + this._addY);
            };
        };
        if(this._globalSettings.QuestDataDifficultySetup.TextColor !== "") {
            if(Utils.RPGMAKER_NAME === "MV") {
                this.changeTextColor(this.textColor(this._globalSettings.QuestDataDifficultySetup.TextColor));
            }else if(Utils.RPGMAKER_NAME === "MZ"){
                this.changeTextColor(ColorManager.textColor(this._globalSettings.QuestDataDifficultySetup.TextColor));
            };
        };
        if(this._questData._questDifficulty.DifficultyText !== "") {
            this.drawText(this._questData._questDifficulty.DifficultyText,this._mainAddX + this._difficultyAddX + 300 + this._questData._questDifficulty.TextX,this._mainAddY + this._difficultyAddY + this._addY + 5 + this._questData._questDifficulty.TextY,this.contents.width);
        };
        this._addY += this.lineHeight();
        this.contents.outlineWidth = 4;
        if(Utils.RPGMAKER_NAME === "MV") {
            this.contents.fontFace = this.standardFontFace();
            this.contents.fontSize = this.standardFontSize();
        }else if(Utils.RPGMAKER_NAME === "MZ"){
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = $gameSystem.mainFontSize();
        };
        this.resetTextColor();
    };
};
//--------------------------------------------------------------------------
// ● クエスト名の描画
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawQuestName = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    this.contents.fontSize = Ayatam.QUEST.CustamizeSettings.MustData.questNameFontSize;
    this.contents.outlineWidth = 5;
    if(this._questData._questName !== "") this.drawText(this._questData._questName,this._mainAddX + this._questNameAddX,this._mainAddY + this._questNameAddY + this._addY,this.contents.width,'center');
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● クエストの最大人数
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawMaxMember = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestNeededMaxMemberLabel !== undefined || this._globalSettings.QuestNeededMaxMemberLabel !== "") {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        var labelSize = this.textWidth(this._globalSettings.QuestNeededMaxMemberLabel);
        this.drawText(this._globalSettings.QuestNeededMaxMemberLabel,this._mainAddX + this._maxMemberAddX + 200,this._mainAddY + this._maxMemberAddY + this._addY + 10,this.contents.width);
        this.resetTextColor();
    }else{
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        var labelSize = this.textWidth('上限人数');
        this.drawText('上限人数',this._mainAddX + this._maxMemberAddX + 200,this._mainAddY + this._maxMemberAddY + this._addY + 10,this.contents.width);
        this.resetTextColor();
    };
    if(this._questData._questMaxMember === null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
        if(this._globalSettings.QuestNoneNeededLabel !== undefined || this._globalSettings.QuestNoneNeededLabel !== "") {
            this.drawText(this._globalSettings.QuestNoneNeededLabel,this._mainAddX + this._maxMemberAddX + labelSize + 200 + 16,this._mainAddY + this._maxMemberAddY + this._addY + 10,this.contents.width);
        }else{
            this.drawText('不問',this._mainAddX + this._maxMemberAddX + labelSize + 200 + 16,this._mainAddY + this._maxMemberAddY + this._addY + 10,this.contents.width);
        };
        this.resetTextColor();
    }else{
        this.contents.fontSize += 5;
        if($gameParty.size() <= this._questData._questMaxMember) {
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
            this.drawText(this._questData._questMaxMember,this._mainAddX + this._maxMemberAddX + labelSize + 200 + 16,this._mainAddY + this._maxMemberAddY + this._addY + 10,this.contents.width);
        }else{
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
            this.drawText(this._questData._questMaxMember,this._mainAddX + this._maxMemberAddX + labelSize + 200 + 16,this._mainAddY + this._maxMemberAddY + this._addY + 10,this.contents.width);
        };
        this.resetTextColor();
    };
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● アクターのレベル条件
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawNeedActorLevel = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestNeededLvlLabel !== undefined || this._globalSettings.QuestNeededLvlLabel.length !== 0) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestNeededLvlLabel[0],this._mainAddX + this._actorLevelAddX + 10,this._mainAddY + this._actorLevelAddY + this._addY + 10,this.contents.width);
        this.resetTextColor();
    }else{
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText('受注可能レベル',this._mainAddX + this._actorLevelAddX + 10,this._mainAddY + this._actorLevelAddY + this._addY + 10,this.contents.width);
        this.resetTextColor();
    };
    this._addY += this.lineHeight();
    var textState = { index:0 };
    if(this._questData._questActorLevel === null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
        if(this._globalSettings.QuestNoneNeededLabel !== undefined || this._globalSettings.QuestNoneNeededLabel !== "") {
            this.drawText(this._globalSettings.QuestNoneNeededLabel,this._mainAddX + this._actorLevelAddX + 10 + 16,this._mainAddY + this._actorLevelAddY + this._addY + 10,this.contents.width);
        }else{
            this.drawText('不問',this._mainAddX + this._actorLevelAddX + 10 + 16,this._mainAddY + this._actorLevelAddY + this._addY + 10,this.contents.width);
        };
        this.resetTextColor();
    }else{
        this._questData._questActorLevel.forEach(actor => {
            textState.text = this.convertEscapeCharacters($gameActors.actor(actor.Actor)._name);
            textState.height = this.calcTextHeight(textState,false);
            this.drawText($gameActors.actor(actor.Actor)._name,this._mainAddX + this._actorLevelAddX + 10,this._mainAddY + this._actorLevelAddY + this._addY + 10,this.contents.width);
            if(this._globalSettings.QuestNeededLvlLabel !== null || this._globalSettings.QuestNeededLvlLabel.length !== 0) {
                var labelSize = this.textWidth(this._globalSettings.QuestNeededLvlLabel[1]);
                this.drawText(this._globalSettings.QuestNeededLvlLabel[1],this._mainAddX + this._actorLevelAddX + 196,this._mainAddY + this._actorLevelAddY + this._addY + 10,this.contents.width);
            }else{
                var labelSize = this.textWidth('Lv.');
                this.drawText('Lv.',this._mainAddX + this._actorLevelAddX + 196,this._mainAddY + this._actorLevelAddY + this._addY + 10,this.contents.width);
            };
            if($gameActors.actor(actor.Actor).level >= actor.ActorLevel) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
                this.drawText(actor.ActorLevel,this._mainAddX + this._actorLevelAddX + 196 + labelSize + 5 + Ayatam.QUEST.CustamizeSettings.MustData.actorLevelNumberX,this._mainAddY + this._actorLevelAddY + this._addY + 10 + Ayatam.QUEST.CustamizeSettings.MustData.actorLevelNumberY,this.contents.width);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
                this.drawText(actor.ActorLevel,this._mainAddX + this._actorLevelAddX + 196 + labelSize + 5 + Ayatam.QUEST.CustamizeSettings.MustData.actorLevelNumberX,this._mainAddY + this._actorLevelAddY + this._addY + 10 + Ayatam.QUEST.CustamizeSettings.MustData.actorLevelNumberY,this.contents.width);
            };
            this.resetTextColor();
            this._addY += textState.height;
        });
    };
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 必須メンバー
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawNeedMember = function() {
    this._addY = 0;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestNeededInMemberLabel !== undefined || this._globalSettings.QuestNeededInMemberLabel !== "") {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestNeededInMemberLabel,this._mainAddX + this._actorNeedAddX + 10,this._mainAddY + this._actorNeedAddY + this._addY + 10,this.contents.width);
        this.resetTextColor();
    }else{
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText('必要メンバー',this._mainAddX + this._actorNeedAddX + 10,this._mainAddY + this._actorNeedAddY + this._addY + 10,this.contents.width);
        this.resetTextColor();
    };
    this._addY += this.lineHeight();
    if(this._questData._questNeedMembers === null || this._questData._questNeedMembers.length === 0) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
        if(this._globalSettings.QuestNoneNeededLabel !== undefined || this._globalSettings.QuestNoneNeededLabel !== "") {
            this.drawText(this._globalSettings.QuestNoneNeededLabel,this._mainAddX + this._actorNeedAddX + 10 + 16,this._mainAddY + this._actorNeedAddY + this._addY + 10,this.contents.width);
        }else{
            this.drawText('不問',this._mainAddX + this._actorNeedAddX + 10 + 16,this._mainAddY + this._actorNeedAddY + this._addY + 10,this.contents.width);
        };
        this.resetTextColor();
    }else{
        this._questData._questNeedMembers.forEach(actor => {
            this.drawCharacter($gameActors.actor(actor)._characterName,$gameActors.actor(actor)._characterIndex,this._mainAddX + this._actorNeedAddX + 26,this._mainAddY + this._actorNeedAddY + this._addY + 50);
            if($gameParty.members().contains($gameActors.actor(actor))) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
                this.drawText($gameActors.actor(actor)._name,this._mainAddX + this._actorNeedAddX + 46 + 5,this._mainAddY + this._actorNeedAddY + this._addY + 20,this.contents.width);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
                this.drawText($gameActors.actor(actor)._name,this._mainAddX + this._actorNeedAddX + 46 + 5,this._mainAddY + this._actorNeedAddY + this._addY + 20,this.contents.width);
            };
            this._addY += this.lineHeight();
        });
    };
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 除外メンバー
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawOutMember = function() {
    this._addY = 0;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestNeededOutMemberLabel !== undefined || this._globalSettings.QuestNeededOutMemberLabel !== "") {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestNeededOutMemberLabel,this._mainAddX + this._actorOutAddX + 10,this._mainAddY + this._actorOutAddY + this._addY + 10,this.contents.width);
        this.resetTextColor();
    }else{
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText('除外メンバー',this._mainAddX + this._actorOutAddX + 10,this._mainAddY + this._actorOutAddY + this._addY + 10,this.contents.width);
        this.resetTextColor();
    };
    this._addY += this.lineHeight();
    if(this._questData._questOutMembers === null || this._questData._questOutMembers.length === 0) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
        if(this._globalSettings.QuestNoneNeededLabel !== undefined || this._globalSettings.QuestNoneNeededLabel !== "") {
            this.drawText(this._globalSettings.QuestNoneNeededLabel,this._mainAddX + this._actorOutAddX + 10 + 16,this._mainAddY + this._actorOutAddY + this._addY + 10,this.contents.width);
        }else{
            this.drawText('不問',this._mainAddX + this._actorOutAddX + 10 + 16,this._mainAddY + this._actorOutAddY + this._addY + 10,this.contents.width);
        };
        this.resetTextColor();
    }else{
        this._questData._questOutMembers.forEach(actor => {
            this.drawCharacter($gameActors.actor(actor)._characterName,$gameActors.actor(actor)._characterIndex,this._mainAddX + this._actorOutAddX + 26,this._mainAddY + this._actorOutAddY + this._addY + 50);
            if($gameParty.members().contains($gameActors.actor(actor))) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
                this.drawText($gameActors.actor(actor)._name,this._mainAddX + this._actorOutAddX + 46 + 5,this._mainAddY + this._actorOutAddY + this._addY + 20,this.contents.width);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
                this.drawText($gameActors.actor(actor)._name,this._mainAddX + this._actorOutAddX + 46 + 5,this._mainAddY + this._actorOutAddY + this._addY + 20,this.contents.width);
            };
            this._addY += this.lineHeight();
        });
    };
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● drawCharacter - Window_CheckQuestMust専用化
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
    if(Utils.RPGMAKER_NAME === "MV") {
        var bitmap = Ayatam.QUEST.imgCashes['characters'][characterName].img;
        var big = Ayatam.QUEST.imgCashes['characters'][characterName].isBig;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var bitmap =  ImageManager.loadCharacter(characterName);
        var big = ImageManager.isBigCharacter(characterName);
    };
    var pw = bitmap.width / (big ? 3 : 12);
    var ph = bitmap.height / (big ? 4 : 8);
    var n = characterIndex;
    var sx = (n % 4 * 3 + 1) * pw;
    var sy = (Math.floor(n / 4) * 4) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};
//--------------------------------------------------------------------------
// ● drawTextEx - Window_CheckQuestMust専用化
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Window_CheckQuestMust.prototype.drawTextEx = function(text, x, y) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_CheckQuestMust.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
};
//--------------------------------------------------------------------------
// ● playOkSound - Window_CheckQuestMust専用化
//--------------------------------------------------------------------------
Window_CheckQuestMust.prototype.playOkSound = function() {
    if($gameQuest.canAssent(this._questId)) {
        SoundManager.playOk();
    }else{
        SoundManager.playBuzzer();
    };
};

//=============================================================================
// Window_CheckQuestMustSub - クエストの受注条件2ページ目ウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストの受注条件2ページ目ウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_CheckQuestMustSub() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_CheckQuestMustSub.prototype = Object.create(Window_Selectable.prototype);
Window_CheckQuestMustSub.prototype.constructor = Window_CheckQuestMustSub;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_CheckQuestMustSub.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.MustWindow.SubX,y = Ayatam.QUEST.CustamizeSettings.MustWindow.SubY,width = Ayatam.QUEST.CustamizeSettings.MustWindow.SubWidth,height = Ayatam.QUEST.CustamizeSettings.MustWindow.SubHeight) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.setupQuestPageTwo();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_CheckQuestMustSub.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.MustWindow.SubX;
        rect.y = Ayatam.QUEST.CustamizeSettings.MustWindow.SubY;
        rect.width = Ayatam.QUEST.CustamizeSettings.MustWindow.SubWidth;
        rect.height = Ayatam.QUEST.CustamizeSettings.MustWindow.SubHeight;
        Window_Selectable.prototype.initialize.call(this, rect);
        this._isWindow = false;
        this.setupQuestPageTwo();
    };
};
//--------------------------------------------------------------------------
// ● 受注条件2ページ目用のセットアップ
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.setupQuestPageTwo = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.MustWindow.SubOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MustWindow.SubBackOpacity;
    this._globalSettings = Ayatam.QUEST.GlobalSettings;
    this._questData = null;
    this._questId = null;
    this._board = false;
    this._mainAddX = 0;
    this._mainAddY = 0;
    this._neededTitleAddX = 0;
    this._neededTitleAddY = 0;
    this._questAreaAddX = 0;
    this._questAreaAddY = 0;
    this._switchesAddX = 0;
    this._switchesAddY = 0;
    this._variablesAddX = 0;
    this._variablesAddY = 0;
    this._questAssentedAddX = 0;
    this._questAssentedAddY = 0;
    this._questReportedAddX = 0;
    this._questReportedAddY = 0;
    this._detailAddX = 0;
    this._detailAddY = 0;
    this._addY = 0;
};
//--------------------------------------------------------------------------
// ● クエストデータの読み込み
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.setQuest = function(quest) {
    if(this._questData === quest) return;
    this._questData = quest;
    if(quest !== null) this._questId = quest._id;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエストデータの参照
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.questData = function() {
    return this._questData;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスかを保存
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.setBoard = function(isBoard) {
    if(this._board === isBoard) return;
    this._board = isBoard;
    if(this._board) this.backOpacity = 255;
    if(!this._board) this.backOpacity = 192;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスを参照
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.fromBoard = function() {
    return this._board;
};
//--------------------------------------------------------------------------
// ● 受注条件2ページ目ウィンドウの refresh を変更
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.refresh = function() {
    this.contents.clear();
    if(this._questData === null) return;
    this._mainAddX = 0;
    this._mainAddY = 0;
    this._neededTitleAddX = Ayatam.QUEST.CustamizeSettings.MustData.subPageTitleX;
    this._neededTitleAddY = Ayatam.QUEST.CustamizeSettings.MustData.subPageTitleY;
    this._questAreaAddX = Ayatam.QUEST.CustamizeSettings.MustData.subPageAreaX;
    this._questAreaAddY = Ayatam.QUEST.CustamizeSettings.MustData.subPageAreaY;
    this._switchesAddX = Ayatam.QUEST.CustamizeSettings.MustData.subPageSwX;
    this._switchesAddY = Ayatam.QUEST.CustamizeSettings.MustData.subPageSwY;
    this._variablesAddX = Ayatam.QUEST.CustamizeSettings.MustData.subPageValX;
    this._variablesAddY = Ayatam.QUEST.CustamizeSettings.MustData.subPageValY;
    this._questAssentedAddX = Ayatam.QUEST.CustamizeSettings.MustData.subPageAssentedX;
    this._questAssentedAddY = Ayatam.QUEST.CustamizeSettings.MustData.subPageAssentedY;
    this._questReportedAddX = Ayatam.QUEST.CustamizeSettings.MustData.subPageReportedX;
    this._questReportedAddY = Ayatam.QUEST.CustamizeSettings.MustData.subPageReportedY;
    this._detailAddX = Ayatam.QUEST.CustamizeSettings.MustData.subPageDetailX;
    this._detailAddY = Ayatam.QUEST.CustamizeSettings.MustData.subPageDetailY;
    this._addY = 0;
    this.drawDesign();
    this.drawSubPageTitle();
    this.drawQuestArea();
    this.drawSwitchInfo();
    this.drawVariablesInfo();
    this.drawNeedAssentedQuestInfo();
    this.drawNeedReportedQuestInfo();
    this.drawDetailInfo();
};
//--------------------------------------------------------------------------
// ● 簡易デザインの描画 
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.drawDesign = function() {
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseAll) return;
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseNeeded) return;
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    var colour = '#000000';
    this.contents.paintOpacity = 127;
    this.contents.fillRect(0,0,this.contents.width,Ayatam.QUEST.CustamizeSettings.NeededSet.Set16,colour);
    this.contents.paintOpacity = 255;
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.NeededSet.Set17,this.contents.width,1,designColor);
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.NeededSet.Set18,this.contents.width,1,designColor);
    this.contents.fillRect(0,this.contents.height + Ayatam.QUEST.CustamizeSettings.NeededSet.Set19,this.contents.width,1,designColor);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 2ページ目のタイトルの描画
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.drawSubPageTitle = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };

    if(this._globalSettings.QuestNeededLabel !== null ||this._globalSettings.QuestNeededLabel !== "") {
        this.contents.fontSize = Ayatam.QUEST.CustamizeSettings.MustData.subPageTitleFontSize;
        this.contents.outlineWidth = 5;
        this.drawText(this._globalSettings.QuestNeededLabel,this._mainAddX + this._neededTitleAddX + 14,this._mainAddY + this._neededTitleAddY + this._addY -2 ,this.contents.width);
    }else{
        this.contents.fontSize = Ayatam.QUEST.CustamizeSettings.MustData.subPageTitleFontSize;
        this.contents.outlineWidth = 5;
        this.drawText('受注条件',this._mainAddX + this._neededTitleAddX + 14,this._mainAddY + this._neededTitleAddY + this._addY -2 ,this.contents.width);
    };
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 活動エリアの描画 
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.drawQuestArea = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataQuestAreaLabel !== null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestDataQuestAreaLabel.LocationLabelName,10,this._addY-1,this.contents.width);
        var labelSize = this.textWidth(this._globalSettings.QuestDataQuestAreaLabel.LocationLabelName);
        this.drawIcon(this._globalSettings.QuestDataQuestAreaLabel.LocationLabelIcon,10+labelSize+14,this._addY);
        this.resetTextColor();
        if(this._questData._questPlaceInformation !== "") {
            this.drawText(this._questData._questPlaceInformation,10+labelSize+50+4,this._addY-1,this.contents.width);
        };
    };
    this._addY += (this.lineHeight()/2);
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● スイッチ情報の描画 
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.drawSwitchInfo = function() {
    if(this._questData._questSwitchConditions === null || this._questData._questSwitchConditions.length === 0) return;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    var listMark = "";
    var textState = { index:0 };
    if(this.contents.fontSize >= 4) this.contents.fontSize -= 2;
    if(this._globalSettings.QuestNeededListMark !== undefined || this._globalSettings.QuestNeededListMark !== "") {
        listMark =  this._globalSettings.QuestNeededListMark;
        textState.text = this.convertEscapeCharacters(listMark);
        textState.height = this.calcTextHeight(textState,false);
    }else{
        listMark = '・';
        textState.text = this.convertEscapeCharacters(listMark);
        textState.height = this.calcTextHeight(textState,false);
    };
    this._questData._questSwitchConditions.forEach(sw => {
        if($gameSwitches.value(sw.SwID) === sw.SwBoolean) {
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
            this.drawText(listMark + $dataSystem.switches[sw.SwID],this._mainAddX + this._switchesAddX + 10,this._mainAddY + this._switchesAddY + this._addY + 20,this.contents.width);
        }else{
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
            this.drawText(listMark + $dataSystem.switches[sw.SwID],this._mainAddX + this._switchesAddX + 10,this._mainAddY + this._switchesAddY + this._addY + 20,this.contents.width);
        };
        this._addY += textState.height;
    });
    this._addY += (this.lineHeight()/2);
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 変数情報の描画
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.drawVariablesInfo = function() {
    if(this._questData._questValConditions === null || this._questData._questValConditions.length === 0) return;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    var listMark = "";
    var textState = { index:0 };
    if(this.contents.fontSize >= 4) this.contents.fontSize -= 2;
    if(this._globalSettings.QuestNeededListMark !== undefined || this._globalSettings.QuestNeededListMark !== "") {
        listMark =  this._globalSettings.QuestNeededListMark;
        textState.text = this.convertEscapeCharacters(listMark);
        textState.height = this.calcTextHeight(textState,false);
    }else{
        listMark = '・';
        textState.text = this.convertEscapeCharacters(listMark);
        textState.height = this.calcTextHeight(textState,false);
    };
    this._questData._questValConditions.forEach(val => {
        if(val.ValCondition === 'mt') {
            if($gameVariables.value(val.Val) > val.Value) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
            };
        }else if(val.ValCondition === 'imt') {
            if($gameVariables.value(val.Val) >= val.Value) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
            };
        }else if(val.ValCondition === 'lt') {
            if($gameVariables.value(val.Val) < val.Value) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
            };
        }else if(val.ValCondition === 'ilt') {
            if($gameVariables.value(val.Val) <= val.Value) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
            };
        }else if(val.ValCondition === 'just') {
            if($gameVariables.value(val.Val) === val.Value) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
            };
        }else if(val.ValCondition === 'stringcheck') {
            if($gameVariables.value(val.Val) === val.Value) {
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
            }else{
                this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
            };
        };
        this.drawText(listMark + $dataSystem.variables[val.Val],this._mainAddX + this._variablesAddX + 10,this._mainAddY + this._variablesAddY + this._addY + 20,this.contents.width);
        this._addY += textState.height;
    });
    this._addY += (this.lineHeight()/2);
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● クエスト情報「受注済み」の描画 
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.drawNeedAssentedQuestInfo = function() {
    if(this._questData._questNeedAssentedQuests === null || this._questData._questNeedAssentedQuests.length === 0) return;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    var listMark = "";
    var assentText = "";
    var textState = { index:0 };
    if(this.contents.fontSize >= 4) this.contents.fontSize -= 2;
    if(this._globalSettings.QuestNeededListMark !== undefined || this._globalSettings.QuestNeededListMark !== "") {
        listMark =  this._globalSettings.QuestNeededListMark;
        textState.text = this.convertEscapeCharacters(listMark);
        textState.height = this.calcTextHeight(textState,false);
    }else{
        listMark = '・';
        textState.text = this.convertEscapeCharacters(listMark);
        textState.height = this.calcTextHeight(textState,false);
    };
    if(this._globalSettings.QuestNeededMustAssentLabel !== undefined || this._globalSettings.QuestNeededMustAssentLabel !== "") {
        assentText =  this._globalSettings.QuestNeededMustAssentLabel;
    }else{
        assentText = 'を受注';
    };
    this._questData._questNeedAssentedQuests.forEach(quest => {
        if($gameQuest.isAssented('quest' + quest)) {
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
        }else{
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
        };
        this.drawText(listMark + '「' + $gameQuest.findQuest('quest' + quest)._questName + '」' + assentText,this._mainAddX + this._questAssentedAddX + 10,this._mainAddY + this._questAssentedAddY + this._addY + 20,this.contents.width);
        this._addY += textState.height;
    });
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● クエスト情報「報告済み」の描画 
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.drawNeedReportedQuestInfo = function() {
    if(this._questData._questNeedClearedQuests === null || this._questData._questNeedClearedQuests.length === 0) return;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    var listMark = "";
    var reportedText = "";
    var textState = { index:0 };
    if(this.contents.fontSize >= 4) this.contents.fontSize -= 2;
    if(this._globalSettings.QuestNeededListMark !== undefined || this._globalSettings.QuestNeededListMark !== "") {
        listMark =  this._globalSettings.QuestNeededListMark;
        textState.text = this.convertEscapeCharacters(listMark);
        textState.height = this.calcTextHeight(textState,false);
    }else{
        listMark = '・';
        textState.text = this.convertEscapeCharacters(listMark);
        textState.height = this.calcTextHeight(textState,false);
    };
    if(this._globalSettings.QuestNeededMustClearLabel !== undefined || this._globalSettings.QuestNeededMustClearLabel !== "") {
        reportedText =  this._globalSettings.QuestNeededMustClearLabel;
    }else{
        reportedText = 'をクリア';
    };
    this._questData._questNeedClearedQuests.forEach(quest => {
        if($gameQuest.isReported('quest' + quest)) {
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealOkColor);
        }else{
            this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
        };
        this.drawText(listMark + '「' + $gameQuest.findQuest('quest' + quest)._questName + '」' + reportedText,this._mainAddX + this._questReportedAddX + 10,this._mainAddY + this._questReportedAddY + this._addY + 20,this.contents.width);
        this._addY += textState.height;
    });
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 受注条件の結果の描画 
//--------------------------------------------------------------------------
Window_CheckQuestMustSub.prototype.drawDetailInfo = function() {
    if($gameQuest.canAssent(this._questId)) return;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    var notAvailable = "";
    this.changeTextColor(Ayatam.QUEST.CustamizeSettings.DealNoColor);
    if(this._globalSettings.QuestNeededNotAvailableLabel !== undefined || this._globalSettings.QuestNeededNotAvailableLabel !== "") {
        notAvailable = this._globalSettings.QuestNeededNotAvailableLabel;
    }else{
        notAvailable = '受注条件を満たしておりません。'
    };
    this.drawText(notAvailable,this._detailAddX + 10,this._detailAddY + 20,this.contents.width);
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● drawTextEx - Window_CheckQuestMustSub専用化
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Window_CheckQuestMustSub.prototype.drawTextEx = function(text, x, y) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_CheckQuestMustSub.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
};

//=============================================================================
// Window_QuestData - クエストの内容表示ウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストデータウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestData() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestData.prototype = Object.create(Window_Selectable.prototype);
Window_QuestData.prototype.constructor = Window_QuestData;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestData.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.DataWindow.DataX, y = Ayatam.QUEST.CustamizeSettings.DataWindow.DataY, width = Ayatam.QUEST.CustamizeSettings.DataWindow.DataWidth, height = Ayatam.QUEST.CustamizeSettings.DataWindow.DataHeight) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.setupQuestData();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestData.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._isWindow = false;
        this.setupQuestData();
    };
};
//--------------------------------------------------------------------------
// ● クエストデータ用のセットアップ
//--------------------------------------------------------------------------
Window_QuestData.prototype.setupQuestData = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.DataWindow.DataOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackOpacity;
    this._globalSettings = Ayatam.QUEST.GlobalSettings;
    this._questModeFailing = this._globalSettings.FailingQuestMode;
    this._pageSound = this._globalSettings.QuestDataPageKey.PageChangeSound;
    this._pageUpKey = this._globalSettings.QuestDataPageKey.PageUpKey;
    this._pageDownKey = this._globalSettings.QuestDataPageKey.PageDownKey;
    this._questData = null;
    this._questId = null;
    this._board = false;
    this._report = false;
    this._addY = 0;
    this._page = 1;
    this.setupQuestSprites();
    this.winSkin();
    this.drawEmptyDesign();
};
//--------------------------------------------------------------------------
// ● クエストデータ用の画像セットアップ
//--------------------------------------------------------------------------
Window_QuestData.prototype.setupQuestSprites = function() {
    this._CharacterSprite = new Sprite();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_QuestData.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackImg.UsePicture) return;
    this._spriteDataBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteDataBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteDataBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteDataBg.x = Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackImg.PictureX;
    this._spriteDataBg.y = Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackImg.Anchor) {
        this._spriteDataBg.anchor.x = 0.5;
        this._spriteDataBg.anchor.y = 0.5;
    };
    this._spriteDataBg.opacity = Ayatam.QUEST.CustamizeSettings.DataWindow.DataBackImg.PictureOpacity;
    this.addChildToBack(this._spriteDataBg);
};
//--------------------------------------------------------------------------
// ● クエストデータの読み込み
//--------------------------------------------------------------------------
Window_QuestData.prototype.setQuest = function(quest) {
    if(this._questData === quest) return;
    this._questData = quest;
    if(quest !== null) this._questId = quest._id;
    this.conditionImgs();
    this._page = 1;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエストデータ内に表示されている画像の制御
//--------------------------------------------------------------------------
Window_QuestData.prototype.conditionImgs = function() {
    if(this._CharacterSprite.bitmap !== undefined) {
        this.removeChild(this._CharacterSprite);
        this._CharacterSprite = new Sprite();
    };
};
//--------------------------------------------------------------------------
// ● クエストデータの参照
//--------------------------------------------------------------------------
Window_QuestData.prototype.questData = function() {
    return this._questData;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスかを保存
//--------------------------------------------------------------------------
Window_QuestData.prototype.setBoard = function(isBoard) {
    if(this._board === isBoard) return;
    this._board = isBoard;
    if(this._board) this.backOpacity = 255;
    if(!this._board) this.backOpacity = 192;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスを参照
//--------------------------------------------------------------------------
Window_QuestData.prototype.fromBoard = function() {
    return this._board;
};
//--------------------------------------------------------------------------
// ● クエストデータのモードを受注・報告の変更読み込み
//--------------------------------------------------------------------------
Window_QuestData.prototype.setReport = function(report) {
    if(this._report === report) return;
    this._report = report;
};
//--------------------------------------------------------------------------
// ● クエストデータのモードを参照
//--------------------------------------------------------------------------
Window_QuestData.prototype.isReporting = function() {
    return this._report;
};
//--------------------------------------------------------------------------
// ● クエストデータウィンドウの refresh を変更
//--------------------------------------------------------------------------
Window_QuestData.prototype.refresh = function() {
    this.contents.clear();
    if(this._questData === null) {
        this.drawEmptyDesign();
        return;
    };
    this._addY = 0;
    this.drawDesign();
    this.drawFlag();
    this.drawDifficulty();
    this.drawQuestName();
    this.drawPageDetail();
    if(this._page === 1) this.drawQuestLocation();
    if(this._page === 1) this.drawClientCharacter();
    if(this._page === 1) this.drawClient();
    if(this._page === 1) this.drawContent();
    if(this._page === 1) this.drawRewards();
    if(this._page === 1) {
        if(this._CharacterSprite.bitmap !== undefined) this._CharacterSprite.visible = true;
    };
    if(this._page === 2) {
        if(this._CharacterSprite.bitmap !== undefined) this._CharacterSprite.visible = false;
    };
    if(this._page === 2) this.drawQuestArea();
    if(this._page === 2) this.drawObjectives();
};
//--------------------------------------------------------------------------
// ● データ無し用のデザインの描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawEmptyDesign = function() {
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseAll) return;
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseData) return;
    var colour = '#000000';
    this.contents.paintOpacity = 167;
    this.contents.fillRect(0,0,this.contents.width,this.contents.height,colour);
    this.contents.paintOpacity = 255;
};
//--------------------------------------------------------------------------
// ● 簡易デザインの描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawDesign = function() {
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseAll) return;
    if(!Ayatam.QUEST.CustamizeSettings.WindowSets.UseData) return;
    if(Utils.RPGMAKER_NAME === "MV") {
        var designColor = this.textColor(16);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var designColor = ColorManager.textColor(16);
    };
    var colour = '#000000';
    this.contents.paintOpacity = 127;
    this.contents.fillRect(0,0,this.contents.width,Ayatam.QUEST.CustamizeSettings.DataSet.Set1,colour);
    this.contents.paintOpacity = 255;
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set2,this.contents.width,1,designColor);
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set3,this.contents.width,1,designColor);
    this.contents.paintOpacity = 127;
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set4,this.contents.width,Ayatam.QUEST.CustamizeSettings.DataSet.Set5,colour);
    this.contents.paintOpacity = 255;
    this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set6,this.contents.width,1,designColor);
    if(this._page === 1) {
        this.contents.fillRect(Ayatam.QUEST.CustamizeSettings.DataSet.Set7,Ayatam.QUEST.CustamizeSettings.DataSet.Set8,Ayatam.QUEST.CustamizeSettings.DataSet.Set9,1,designColor);
        this.contents.fillRect(Ayatam.QUEST.CustamizeSettings.DataSet.Set10,Ayatam.QUEST.CustamizeSettings.DataSet.Set11,Ayatam.QUEST.CustamizeSettings.DataSet.Set12,1,designColor);
        this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set13,this.contents.width,1,designColor);
        this.contents.paintOpacity = 127;
        this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set14,this.contents.width,Ayatam.QUEST.CustamizeSettings.DataSet.Set15,colour);
        this.contents.paintOpacity = 255;
        this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set16,this.contents.width,1,designColor);
        this.contents.paintOpacity = 127;
        this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set17,this.contents.width,Ayatam.QUEST.CustamizeSettings.DataSet.Set18,colour);
        this.contents.paintOpacity = 255;
    }else if(this._page === 2) {
        this.contents.fillRect(0,Ayatam.QUEST.CustamizeSettings.DataSet.Set19,this.contents.width,1,designColor);
    };
};
//--------------------------------------------------------------------------
// ● フラッグの描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawFlag = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._questData._questIcon !== null) {
        if(this._questData._questIcon.QuestIconID !== -1) {
            this.drawIcon(this._questData._questIcon.QuestIconID,this._questData._questIcon.QuestIconX,this._addY + this._questData._questIcon.QuestIconY);
        };
    };
    if(this._questData._questFlagID !== null) {
        if(this._globalSettings.QuestFlags !== "" || this._globalSettings.QuestFlags.length !== 0) {
            this.contents.fontSize = Ayatam.QUEST.CustamizeSettings.QuestDatas.flagFontSize;
            this.contents.outlineWidth = 5;
            this.drawText(this._globalSettings.QuestFlags[this._questData._questFlagID],34 + Ayatam.QUEST.CustamizeSettings.QuestDatas.flagX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.flagY ,this.contents.width);
        };
    };
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 難易度の描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawDifficulty = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._questData._questDifficulty !== null) {
        if(this._globalSettings.QuestDataDifficultySetup !== "") {
            var Icons = this._globalSettings.QuestDataDifficultySetup.IconPacks[this._questData._questDifficulty.IconsetID];
            var checkIcons = [...String(Icons)];
            if(checkIcons.includes(',')) {
                var IconList = Icons.split(',');
                var countIcon = 0;
                IconList.forEach(icon => {
                    this.drawIcon(icon,420+countIcon+Ayatam.QUEST.CustamizeSettings.QuestDatas.DifficultyIconX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.DifficultyIconY);
                    countIcon += Ayatam.QUEST.CustamizeSettings.QuestDatas.DifficultyIconW;
                });
            }else{
                this.drawIcon(Icons,420+Ayatam.QUEST.CustamizeSettings.QuestDatas.DifficultyIconX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.DifficultyIconY);
            };
        };
        if(this._globalSettings.QuestDataDifficultySetup.TextColor !== "") {
            if(Utils.RPGMAKER_NAME === "MV") {
                this.changeTextColor(this.textColor(this._globalSettings.QuestDataDifficultySetup.TextColor));
            }else if(Utils.RPGMAKER_NAME === "MZ"){
                this.changeTextColor(ColorManager.textColor(this._globalSettings.QuestDataDifficultySetup.TextColor));
            };
        };
        if(this._questData._questDifficulty.DifficultyText !== "") {
            this.drawText(this._questData._questDifficulty.DifficultyText,300 + this._questData._questDifficulty.TextX + Ayatam.QUEST.CustamizeSettings.QuestDatas.DifficultyX,this._addY + 5 + this._questData._questDifficulty.TextY + Ayatam.QUEST.CustamizeSettings.QuestDatas.DifficultyY,this.contents.width);
        };
        this._addY += this.lineHeight();
        this.contents.outlineWidth = 4;
        if(Utils.RPGMAKER_NAME === "MV") {
            this.contents.fontFace = this.standardFontFace();
            this.contents.fontSize = this.standardFontSize();
        }else if(Utils.RPGMAKER_NAME === "MZ"){
            this.contents.fontFace = $gameSystem.mainFontFace();
            this.contents.fontSize = $gameSystem.mainFontSize();
        };
        this.resetTextColor();
    };
};
//--------------------------------------------------------------------------
// ● クエスト名の描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawQuestName = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    this.contents.fontSize = Ayatam.QUEST.CustamizeSettings.QuestDatas.QuestNameFontSize;
    this.contents.outlineWidth = 5;
    if(this._questData._questName !== "") this.drawText(this._questData._questName,0 + Ayatam.QUEST.CustamizeSettings.QuestDatas.QuestNameX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.QuestNameY,this.contents.width,'center');
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● ページ情報の描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawPageDetail = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataPageUpLabel !== null) {
        this.drawIcon(this._globalSettings.QuestDataPageUpLabel.PageUpIcon,this.contents.width - this.contents.width + 10 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageUpKeyX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageUpKeyY + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageUpKeyIconY);
        this.drawText(this._globalSettings.QuestDataPageUpLabel.PageUpKeyLabel,this.contents.width - this.contents.width + 10 + 36 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageUpKeyX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageUpKeyY,this.contents.width);
    };
    if(this._globalSettings.QuestDataInfoLabel !== "") {
        this.drawText(this._globalSettings.QuestDataInfoLabel[this._page-1],-60 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageLabelX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageLabelY,this.contents.width,'center');
    };
    this.drawText(this._page + '/2',60 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageLabelPageX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageLabelPageY,this.contents.width,'center');
    if(this._globalSettings.QuestDataPageDownLabel !== null) {
        this.drawText(this._globalSettings.QuestDataPageDownLabel.PageDownKeyLabel,this.contents.width - 36 - 10 - 50 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageDownKeyX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageDownKeyY,this.contents.width);
        this.drawIcon(this._globalSettings.QuestDataPageDownLabel.PageDownIcon,this.contents.width - 36 - 10 + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageDownKeyX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageDownKeyY + Ayatam.QUEST.CustamizeSettings.QuestDatas.PageDownKeyIconY);
    };
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 受注場所の描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawQuestLocation = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataLocationLabel !== null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestDataLocationLabel.LocationLabelName,40 + Ayatam.QUEST.CustamizeSettings.QuestDatas.LocationLabelX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.LocationLabelY,this.contents.width,'center');
        this.resetTextColor();
        this._addY += this.lineHeight();
        this.drawIcon(this._globalSettings.QuestDataLocationLabel.LocationLabelIcon,this.contents.width - (this.contents.width/2) + 8 + Ayatam.QUEST.CustamizeSettings.QuestDatas.LocationX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.LocationY);
    };
    if(this._questData._questClient !== null) {
        this.drawText(this._questData._questClient.QuestLocation,this.contents.width - (this.contents.width/2) + 10 + 36 + Ayatam.QUEST.CustamizeSettings.QuestDatas.LocationX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.LocationY,this.contents.width);
    };
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● 依頼者の歩行グラフィックの描画 「ピクチャー含む」
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawClientCharacter = function() {
    if(this._questData._questClient !== null) {
        this.drawCharacter(this._questData._questClient.QuestClientSprite.SpriteName,this._questData._questClient.QuestClientSprite.SpriteIndex,this._questData._questClient.QuestClientSprite.SpriteX + 40,this._questData._questClient.QuestClientSprite.SpriteY + (this._addY - 13));
        if(this._questData._questClient.QuestClientPicture !== "") {
            if(this._questData._questClient.QuestClientPicture.UsePicture){
                if(this._CharacterSprite.bitmap === undefined) {
                    var pictureDir = this._questData._questClient.QuestClientPicture.PictureFile;
                    if(Utils.RPGMAKER_NAME === "MV") {
                        this._CharacterSprite.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
                    }else if(Utils.RPGMAKER_NAME === "MZ"){
                        this._CharacterSprite.bitmap = ImageManager.loadQuests(pictureDir);
                    };
                    this._CharacterSprite.x = this._questData._questClient.QuestClientPicture.PictureX;
                    this._CharacterSprite.y = this._questData._questClient.QuestClientPicture.PictureY + this._addY - 50;
                    if(this._questData._questClient.QuestClientPicture.PictureAnchor) {
                        this._CharacterSprite.anchor.x = 0.5;
                        this._CharacterSprite.anchor.y = 0.5;
                    };
                    this._CharacterSprite.opacity = this._questData._questClient.QuestClientPicture.PictureOpacity;
                    this.addChild(this._CharacterSprite);
                };
            };
        };
    };
};
//--------------------------------------------------------------------------
// ● 依頼者の描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawClient = function() {
    this._addY -= (this.lineHeight()*2);
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataClientLabel !== null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestDataClientLabel,-120 + Ayatam.QUEST.CustamizeSettings.QuestDatas.ClientLabelX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.ClientLabelY,this.contents.width,'center');
        this.resetTextColor();
        this._addY += this.lineHeight();
    };
    if(this._questData._questClient !== null) {
        this.drawText(this._questData._questClient.QuestClientName,this.contents.width - (this.contents.width/2) - 145 + Ayatam.QUEST.CustamizeSettings.QuestDatas.ClientX,this._addY - 2 + Ayatam.QUEST.CustamizeSettings.QuestDatas.ClientY,this.contents.width);
    };
    this._addY += this.lineHeight();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● クエストの概要内容の描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawContent = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataContentLabel !== null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestDataContentLabel,10 + Ayatam.QUEST.CustamizeSettings.QuestDatas.ContentLabelX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.ContentLabelY,this.contents.width);
    };
    this.resetTextColor();
    this._addY += this.lineHeight();
    if(this._questData._questContent !== null) {
        this.drawTextEx(this._questData._questContent,27 + Ayatam.QUEST.CustamizeSettings.QuestDatas.ContentX,this._addY + 4 + Ayatam.QUEST.CustamizeSettings.QuestDatas.ContentY);
    };
    this._addY += (this.lineHeight()*2);
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.resetTextColor();
};
//--------------------------------------------------------------------------
// ● クエストの報酬の描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawRewards = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataRewardLabel !== null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestDataRewardLabel.RewardLabelName,10 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardLabelX,this._addY - 8 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardLabelY,this.contents.width);
    };
    this._addY += ((this.lineHeight()*2)-35);
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
    this.drawRewardExp();
    this.drawRewardGold();
    this.drawRewardItems();
};
//--------------------------------------------------------------------------
// ● クエストの報酬の描画 「経験値」
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawRewardExp = function() {
    if(this._questData._questRewardExp <= 0) return;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataRewardLabel !== null) {
        this.drawIcon(this._globalSettings.QuestDataRewardLabel.RewardExpIcon,10 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardExpX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardExpY);
        var exp_size = this.textWidth(this._questData._questRewardExp);
        this.drawText(this._questData._questRewardExp,36 + 14 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardExpX,this._addY - 3 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardExpY,this.contents.width);
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.ExpGoldColor);
        this.drawText(this._globalSettings.QuestDataRewardLabel.RewardExpUnit,10 + 36 + 14 + exp_size + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardExpX,this._addY - 3 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardExpY,this.contents.width);
    };
    this._addY += this.lineHeight();
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};
//--------------------------------------------------------------------------
// ● クエストの報酬の描画 「お金」
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawRewardGold = function() {
    if(this._questData._questRewardGold <= 0) return;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataRewardLabel !== null) {
        this.drawIcon(this._globalSettings.QuestDataRewardLabel.RewardGoldIcon,10 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardGoldX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardGoldY);
        var gold_size = this.textWidth(this._questData._questRewardGold);
        this.drawText(this._questData._questRewardGold,36 + 14 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardGoldX,this._addY - 3 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardGoldY,this.contents.width);
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.ExpGoldColor);
        this.drawText(this._globalSettings.QuestDataRewardLabel.RewardGoldUnit,10 + 36 + 14 + gold_size + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardGoldX,this._addY - 3 + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardGoldY,this.contents.width);
    };
    this._addY += this.lineHeight();
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};
//--------------------------------------------------------------------------
// ● クエストの報酬の描画 「アイテム」
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawRewardItems = function() {
    if(this._questData._questRewardItem === null) return;
    if(this._questData._questRewardItem === "" || this._questData._questRewardItem.length === 0) return;
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    var addX = 0;
    if(Utils.RPGMAKER_NAME === "MV") {
        var mvmzX = 8;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var mvmzX = 10;
    };
    var reward = null;
    var rewardSize = 0;
    var items = this._questData._questRewardItem;
    items.forEach(item => {
        if(item.UseWitchItem === "Item") {
            reward = $dataItems[item.SelectedItem]; 
        }else if(item.UseWitchItem === "Weapon"){
            reward = $dataWeapons[item.SelectedWeapon];
        }else if(item.UseWitchItem === "Armor"){
            reward = $dataArmors[item.SelectedArmor];
        };
        rewardSize = this.textWidth(reward.name);
        this.drawItemName(reward,item.Amount,mvmzX + addX + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardItemX,this._addY + Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardItemY,this.contents.width);
        if(Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardItemDrawMode) {
            if(addX !== Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardItemSecondX) {
                addX = Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardItemSecondX;
            }else{
                addX = 0;
            };
            if(addX !== Ayatam.QUEST.CustamizeSettings.QuestDatas.RewardItemSecondX) this._addY += this.lineHeight();
        }else{
            this._addY += this.lineHeight();
        };
    });
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};
//--------------------------------------------------------------------------
// ● クエストの活動エリアの描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawQuestArea = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    if(this._globalSettings.QuestDataQuestAreaLabel !== null) {
        this.changeTextColor(Ayatam.QUEST.CustamizeSettings.HeadingColor);
        this.drawText(this._globalSettings.QuestDataQuestAreaLabel.LocationLabelName,10,this._addY-1,this.contents.width);
        var labelSize = this.textWidth(this._globalSettings.QuestDataQuestAreaLabel.LocationLabelName);
        this.drawIcon(this._globalSettings.QuestDataQuestAreaLabel.LocationLabelIcon,10+labelSize+14,this._addY);
        this.resetTextColor();
        if(this._questData._questPlaceInformation !== "") {
            this.drawText(this._questData._questPlaceInformation,10+labelSize+50+4,this._addY-1,this.contents.width);
        };
    };
    this._addY += (this.lineHeight()*2) - (this.lineHeight()/2);
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};
//--------------------------------------------------------------------------
// ● クエストの目的の描画
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawObjectives = function() {
    if(this._globalSettings.FontSetup !== null) {
        if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
    };
    if(this._globalSettings.FontSetup !== null) {
        this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
    };
    var textState = { index: 0 };
    var textLines = [];
    var textLineHeight = 0;
    if($gameQuest.getAllObjectives(this._questId) !== null) {
        var objectiveLists = $gameQuest.getAllObjectives(this._questId);
    }else{
        var objectiveLists = [];
    };
    if(!this._questData.isRootQuest()) {//通常クエスト
        var clearCheck = 0;
        var addX = 0;
        objectiveLists.forEach(obj => {
            if(textLines.length > 1) this._addY -= textLineHeight;
            if(this._questModeFailing) {//失敗モード時
                if($gameQuest.isFailed(this._questId)) {//クエスト失敗時
                    clearCheck = 0;
                    this.changePaintOpacity(true);
                    if(obj._objectiveIcons.ObjectiveFailedIcon !== 0){
                        this.drawIcon(obj._objectiveIcons.ObjectiveFailedIcon,10,this._addY);
                        addX += 36;
                    }else{
                        if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                            this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                            addX += 36;
                        };
                    };
                    textState.text = this.convertEscapeCharacters(obj._content);
                    textLines = textState.text.split('\n');
                    if(textLines.length > 1) {
                        textLineHeight = this.calcTextHeight(textState,true);
                    }else{
                        textLineHeight = this.calcTextHeight(textState,false);
                    };
                    this.changePaintOpacity(false);
                    this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                }else{//クエスト進行時
                    if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                        clearCheck = 1;
                        this.changePaintOpacity(true);
                        if(obj._objectiveIcons.ObjectiveClearedIcon !== 0){
                            this.drawIcon(obj._objectiveIcons.ObjectiveClearedIcon,10,this._addY);
                            addX += 36;
                        }else{
                            if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                                addX += 36;
                            };
                        };
                        textState.text = this.convertEscapeCharacters(obj._content);
                        textLines = textState.text.split('\n');
                        if(textLines.length > 1) {
                            textLineHeight = this.calcTextHeight(textState,true);
                        }else{
                            textLineHeight = this.calcTextHeight(textState,false);
                        };
                        this.changePaintOpacity(false);
                        this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                    }else{//対象オブジェクト未クリア
                        clearCheck = 0;
                        this.changePaintOpacity(true);
                        if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0){
                            this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                            addX += 36;
                        };
                        textState.text = this.convertEscapeCharacters(obj._content);
                        textLines = textState.text.split('\n');
                        if(textLines.length > 1) {
                            textLineHeight = this.calcTextHeight(textState,true);
                        }else{
                            textLineHeight = this.calcTextHeight(textState,false);
                        };
                        this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                    };
                };
                this.drawText(obj._target + '/' + obj._finishAmount,-2,this._addY-2,this.contents.width,'right');
                addX = 0;
                if(textLines.length > 1) {
                    this._addY += this.lineHeight() + textLineHeight + 16;
                }else{
                    this._addY += this.lineHeight();
                };
            }else{//通常モード時
                if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                    clearCheck = 1;
                    this.changePaintOpacity(true);
                    if(obj._objectiveIcons.ObjectiveClearedIcon !== 0){
                        this.drawIcon(obj._objectiveIcons.ObjectiveClearedIcon,10,this._addY);
                        addX += 36;
                    }else{
                        if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                            this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                            addX += 36;
                        };
                    };
                    textState.text = this.convertEscapeCharacters(obj._content);
                    textLines = textState.text.split('\n');
                    if(textLines.length > 1) {
                        textLineHeight = this.calcTextHeight(textState,true);
                    }else{
                        textLineHeight = this.calcTextHeight(textState,false);
                    };
                    this.changePaintOpacity(false);
                    this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                }else{//対象オブジェクト未クリア
                    clearCheck = 0;
                    this.changePaintOpacity(true);
                    if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0){
                        this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                        addX += 36;
                    };
                    textState.text = this.convertEscapeCharacters(obj._content);
                    textLines = textState.text.split('\n');
                    if(textLines.length > 1) {
                        textLineHeight = this.calcTextHeight(textState,true);
                    }else{
                        textLineHeight = this.calcTextHeight(textState,false);
                    };
                    this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                };
                this.drawText(obj._target + '/' + obj._finishAmount,-2,this._addY-2,this.contents.width,'right');
                addX = 0;
                if(textLines.length > 1) {
                    this._addY += this.lineHeight() + textLineHeight + 16;
                }else{
                    this._addY += this.lineHeight();
                };
            };
        });
        if(this._questData._questClearContent !== null) {
            if(clearCheck === 0) {
                this.changePaintOpacity(false);
                this.resetTextColor();
            }else{
                if($gameQuest.isReported(this._questId)) {
                    this.changePaintOpacity(false);
                    this.resetTextColor();
                }else{
                    this.changePaintOpacity(true);
                    this.resetTextColor();
                };
            };
            this.drawText(this._questData._questClearContent,addX+10,this._addY-2,this.contents.width);
            this._addY += this.lineHeight();
        };
    }else{//ルートクエスト
        var clearCheck = 0;
        var addX = 0;
        var canBreak = false;
        objectiveLists.forEach(obj => {
            if(!canBreak) {
                if(this._questModeFailing) {//失敗モード時
                    if($gameQuest.isFailed(this._questId)) {
                        if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                            clearCheck = 1;
                            this.changePaintOpacity(true);
                            if(obj._objectiveIcons.ObjectiveFailedIcon !== 0){
                                this.drawIcon(obj._objectiveIcons.ObjectiveFailedIcon,10,this._addY);
                                addX += 36;
                            }else{
                                if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                    this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                                    addX += 36;
                                };
                            };
                            textState.text = this.convertEscapeCharacters(obj._content);
                            textLines = textState.text.split('\n');
                            if(textLines.length > 1) {
                                textLineHeight = this.calcTextHeight(textState,true);
                            }else{
                                textLineHeight = this.calcTextHeight(textState,false);
                            };
                            this.changePaintOpacity(false);
                            this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                        }else{//対象オブジェクト未クリア
                            canBreak = true;
                            clearCheck = 0;
                            this.changePaintOpacity(true);
                            if(obj._objectiveIcons.ObjectiveFailedIcon !== 0){
                                this.drawIcon(obj._objectiveIcons.ObjectiveFailedIcon,10,this._addY);
                                addX += 36;
                            }else{
                                if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                    this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                                    addX += 36;
                                };
                            };
                            textState.text = this.convertEscapeCharacters(obj._content);
                            textLines = textState.text.split('\n');
                            if(textLines.length > 1) {
                                textLineHeight = this.calcTextHeight(textState,true);
                            }else{
                                textLineHeight = this.calcTextHeight(textState,false);
                            };
                            this.changePaintOpacity(false);
                            this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                        };
                    }else{
                        if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                            clearCheck = 1;
                            this.changePaintOpacity(true);
                            if(obj._objectiveIcons.ObjectiveClearedIcon !== 0){
                                this.drawIcon(obj._objectiveIcons.ObjectiveClearedIcon,10,this._addY);
                                addX += 36;
                            }else{
                                if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                    this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                                    addX += 36;
                                };
                            };
                            textState.text = this.convertEscapeCharacters(obj._content);
                            textLines = textState.text.split('\n');
                            if(textLines.length > 1) {
                                textLineHeight = this.calcTextHeight(textState,true);
                            }else{
                                textLineHeight = this.calcTextHeight(textState,false);
                            };
                            this.changePaintOpacity(false);
                            this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                        }else{//対象オブジェクト未クリア
                            canBreak = true;
                            clearCheck = 0;
                            this.changePaintOpacity(true);
                            if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0){
                                this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                                addX += 36;
                            };
                            textState.text = this.convertEscapeCharacters(obj._content);
                            textLines = textState.text.split('\n');
                            if(textLines.length > 1) {
                                textLineHeight = this.calcTextHeight(textState,true);
                            }else{
                                textLineHeight = this.calcTextHeight(textState,false);
                            };
                            this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                        };
                    };
                }else{//通常モード時
                    if(obj._target >= obj._finishAmount) {//対象オブジェクトクリア
                        clearCheck = 1;
                        this.changePaintOpacity(true);
                        if(obj._objectiveIcons.ObjectiveClearedIcon !== 0){
                            this.drawIcon(obj._objectiveIcons.ObjectiveClearedIcon,10,this._addY);
                            addX += 36;
                        }else{
                            if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0) {
                                this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                                addX += 36;
                            };
                        };
                        textState.text = this.convertEscapeCharacters(obj._content);
                        textLines = textState.text.split('\n');
                        if(textLines.length > 1) {
                            textLineHeight = this.calcTextHeight(textState,true);
                        }else{
                            textLineHeight = this.calcTextHeight(textState,false);
                        };
                        this.changePaintOpacity(false);
                        this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                    }else{//対象オブジェクト未クリア
                        canBreak = true;
                        clearCheck = 0;
                        this.changePaintOpacity(true);
                        if(obj._objectiveIcons.ObjectiveActivatedIcon !== 0){
                            this.drawIcon(obj._objectiveIcons.ObjectiveActivatedIcon,10,this._addY);
                            addX += 36;
                        };
                        textState.text = this.convertEscapeCharacters(obj._content);
                        textLines = textState.text.split('\n');
                        if(textLines.length > 1) {
                            textLineHeight = this.calcTextHeight(textState,true);
                        }else{
                            textLineHeight = this.calcTextHeight(textState,false);
                        };
                        this.drawTextEx(obj._content,addX+10,this._addY+4,this.contents.width);
                    };
                };
                this.drawText(obj._target + '/' + obj._finishAmount,-2,this._addY-2,this.contents.width,'right');
                addX = 0;
                if(textLines.length > 1) {
                    this._addY += textLineHeight + 5;
                }else{
                    this._addY += this.lineHeight();
                };
            };
        });
        if(this._questData._questClearContent !== null) {
            if(clearCheck === 0) {
                this.changePaintOpacity(false);
                this.resetTextColor();
            }else{
                if($gameQuest.isReported(this._questId)) {
                    this.changePaintOpacity(false);
                    this.resetTextColor();
                }else{
                    this.changePaintOpacity(true);
                    this.resetTextColor();
                };
            };
            this.drawText(this._questData._questClearContent,addX+10,this._addY-2,this.contents.width);
            this._addY += this.lineHeight();
        };
    };
    this.changePaintOpacity(true);
    this.resetTextColor();
    this.contents.outlineWidth = 4;
    if(Utils.RPGMAKER_NAME === "MV") {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = $gameSystem.mainFontSize();
    };
};
//--------------------------------------------------------------------------
// ● クエストデータウィンドウの更新
//--------------------------------------------------------------------------
Window_QuestData.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if(!this.active && !this._opening) return;
    if(Input.isTriggered(this._pageUpKey)) this.changePage();
    if(Input.isTriggered(this._pageDownKey)) this.changePage();
};
//--------------------------------------------------------------------------
// ● ページの変更
//--------------------------------------------------------------------------
Window_QuestData.prototype.changePage = function() {
    if(this._questData === null) return;
    if(this._page === 1) {
        this._page = 2;
        AudioManager.playSe({"name": this._pageSound ,"volume":90,"pitch":100,"pan":0});
    }else if(this._page === 2){
        this._page = 1;
        AudioManager.playSe({"name": this._pageSound ,"volume":90,"pitch":100,"pan":0});
    };
    this.refresh();
};
//--------------------------------------------------------------------------
// ● drawItemName - Window_QuestData専用化
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestData.prototype.drawItemName = function(item, Amount, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            var addAmount = "";
            if(Amount > 1) {
                addAmount = 'x' + Amount;
            };
            this.drawText(item.name + addAmount, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestData.prototype.drawItemName = function(item, Amount, x, y, width) {
        if (item) {
            const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const textMargin = ImageManager.iconWidth + 4;
            const itemWidth = Math.max(0, width - textMargin);
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x, iconY);
            var addAmount = "";
            if(Amount > 1) {
                addAmount = 'x' + Amount;
            };
            this.drawText(item.name + addAmount, x + textMargin, y, itemWidth);
        }
    };
};
//--------------------------------------------------------------------------
// ● drawCharacter - Window_QuestData専用化
//--------------------------------------------------------------------------
Window_QuestData.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
    if(Utils.RPGMAKER_NAME === "MV") {
        var bitmap = Ayatam.QUEST.imgCashes['characters'][characterName].img;
        var big = Ayatam.QUEST.imgCashes['characters'][characterName].isBig;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var bitmap =  ImageManager.loadCharacter(characterName);
        var big = ImageManager.isBigCharacter(characterName);
    };
    var pw = bitmap.width / (big ? 3 : 12);
    var ph = bitmap.height / (big ? 4 : 8);
    var n = characterIndex;
    var sx = (n % 4 * 3 + 1) * pw;
    var sy = (Math.floor(n / 4) * 4) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};
//--------------------------------------------------------------------------
// ● drawTextEx - Window_QuestData専用化
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestData.prototype.drawTextEx = function(text, x, y) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestData.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
};

//=============================================================================
// Window_QuestMenuNavCommand - クエストナビゲーターコマンドウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストナビゲーターコマンドウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestMenuNavCommand() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestMenuNavCommand.prototype = Object.create(Window_Command.prototype);
Window_QuestMenuNavCommand.prototype.constructor = Window_QuestMenuNavCommand;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestMenuNavCommand.prototype.initialize = function(x,y) {
        Window_Command.prototype.initialize.call(this,x,y);
        this.setupNaviCommand();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestMenuNavCommand.prototype.initialize = function(rect) {
        rect.width = 240;
        rect.height = this.fittingHeight(2);
        Window_Command.prototype.initialize.call(this,rect);
        this._isWindow = false;
        this.setupNaviCommand();
    };
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターコマンド用のセットアップ
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.setupNaviCommand = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackOpacity;
    this._questData = null;
    this._questId = null;
    this._board = false;
    this.winSkin();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackImg.UsePicture) return;
    this._spriteNavCommandBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteNavCommandBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteNavCommandBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteNavCommandBg.x = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackImg.PictureX;
    this._spriteNavCommandBg.y = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackImg.Anchor) {
        this._spriteNavCommandBg.anchor.x = 0.5;
        this._spriteNavCommandBg.anchor.y = 0.5;
    };
    this._spriteNavCommandBg.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandBackImg.PictureOpacity;
    this.addChildToBack(this._spriteNavCommandBg);
};
//--------------------------------------------------------------------------
// ● クエストデータの読み込み
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.setQuest = function(quest) {
    if(this._questData === quest) return;
    this._questData = quest;
    if(quest !== null) this._questId = quest._id;
};
//--------------------------------------------------------------------------
// ● クエストデータの参照
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.questData = function() {
    return this._questData;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスかを保存
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.setBoard = function(isBoard) {
    if(this._board === isBoard) return;
    this._board = isBoard;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスを参照
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.fromBoard = function() {
    return this._board;
};
//--------------------------------------------------------------------------
// ● コマンドリストの作成
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.makeCommandList = function() {
    if($gameQuest !== undefined) {
        if(Ayatam.QUEST.GlobalSettings === undefined) {
            this.addCommand('ナビ設定','setNav',true);
            this.addCommand('ナビ解除','unsetNav');
            this.addCommand('キャンセル','cancel');
        }else{
            if($gameParty.getNav() !== this._questId){
                if(this._questId !== undefined) {
                    this.addCommand(Ayatam.QUEST.GlobalSettings.QuestNaviCommandName[0],'setNav',$gameQuest.canSetNav(this._questId));
                }else{
                    this.addCommand(Ayatam.QUEST.GlobalSettings.QuestNaviCommandName[0],'setNav',true);
                };
            }else{
                this.addCommand(Ayatam.QUEST.GlobalSettings.QuestNaviCommandName[1],'unsetNav');
            };
            this.addCommand(Ayatam.QUEST.GlobalSettings.QuestNaviCommandName[2],'cancel');
        };
    }else{
        return;
    };
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.drawItem = function(index) {
    if(Utils.RPGMAKER_NAME === "MV") {
        var rect = this.itemRectForText(index);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var rect = this.itemLineRect(index);
    };
    var align = 'center';
    this.resetTextColor();
    if(Ayatam.QUEST.GlobalSettings !== undefined) {
        if(Ayatam.QUEST.GlobalSettings.FontSetup !== "") {
            if(Ayatam.QUEST.GlobalSettings.FontSetup.FontName !== "") this.contents.fontFace = Ayatam.QUEST.GlobalSettings.FontSetup.FontName;
            this.contents.fontSize = Ayatam.QUEST.GlobalSettings.FontSetup.FontSize;
        };
    };
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};
//--------------------------------------------------------------------------
// ● 項目の描画数
//--------------------------------------------------------------------------
Window_QuestMenuNavCommand.prototype.maxItems = function() {
    return 2;
};

//=============================================================================
// Window_QuestCancelingCommand - クエスト放棄コマンドウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエスト放棄コマンドウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestCancelingCommand() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestCancelingCommand.prototype = Object.create(Window_Command.prototype);
Window_QuestCancelingCommand.prototype.constructor = Window_QuestCancelingCommand;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestCancelingCommand.prototype.initialize = function(x,y) {
        Window_Command.prototype.initialize.call(this,x,y);
        this.setupCancelingCammand();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestCancelingCommand.prototype.initialize = function(rect) {
        rect.width = 240;
        rect.height = this.fittingHeight(2);
        Window_Command.prototype.initialize.call(this,rect);
        this._isWindow = false;
        this.setupCancelingCammand();
    };
};
//--------------------------------------------------------------------------
// ● クエスト放棄コマンド用のセットアップ
//--------------------------------------------------------------------------
Window_QuestCancelingCommand.prototype.setupCancelingCammand = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackOpacity;
    this._questData = null;
    this._questId = null;
    this.winSkin();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_QuestCancelingCommand.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackImg.UsePicture) return;
    this._spriteCancelingBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteCancelingBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteCancelingBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteCancelingBg.x = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackImg.PictureX;
    this._spriteCancelingBg.y = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackImg.Anchor) {
        this._spriteCancelingBg.anchor.x = 0.5;
        this._spriteCancelingBg.anchor.y = 0.5;
    };
    this._spriteCancelingBg.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingBackImg.PictureOpacity;
    this.addChildToBack(this._spriteCancelingBg);
};
//--------------------------------------------------------------------------
// ● クエストデータの読み込み
//--------------------------------------------------------------------------
Window_QuestCancelingCommand.prototype.setQuest = function(quest) {
    if(this._questData === quest) return;
    this._questData = quest;
    if(quest !== null) this._questId = quest._id;
};
//--------------------------------------------------------------------------
// ● コマンドリストの作成
//--------------------------------------------------------------------------
Window_QuestCancelingCommand.prototype.makeCommandList = function() {
    if(this._questData !== undefined) {
        if(!$gameQuest.isReported(this._questId)){
            this.addCommand(Ayatam.QUEST.GlobalSettings.QuestCancelCommand[0],'ok',$gameQuest.canCancel(this._questId));
        }else{
            this.addCommand(Ayatam.QUEST.GlobalSettings.QuestCancelCommand[0],'ok',false);
        };
    }else{
        this.addCommand(Ayatam.QUEST.GlobalSettings.QuestCancelCommand[0],'ok',true);
    };
    this.addCommand(Ayatam.QUEST.GlobalSettings.QuestCancelCommand[1],'cancel');
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_QuestCancelingCommand.prototype.drawItem = function(index) {
    if(Utils.RPGMAKER_NAME === "MV") {
        var rect = this.itemRectForText(index);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var rect = this.itemLineRect(index);
    };
    var align = 'center';
    this.resetTextColor();
    if(Ayatam.QUEST.GlobalSettings !== undefined) {
        if(Ayatam.QUEST.GlobalSettings.FontSetup !== "") {
            if(Ayatam.QUEST.GlobalSettings.FontSetup.FontName !== "") this.contents.fontFace = Ayatam.QUEST.GlobalSettings.FontSetup.FontName;
            this.contents.fontSize = Ayatam.QUEST.GlobalSettings.FontSetup.FontSize;
        };
    };
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

//=============================================================================
// Window_QuestAssenting - クエスト受注コマンドウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエスト受注コマンドウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestAssenting() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestAssenting.prototype = Object.create(Window_Command.prototype);
Window_QuestAssenting.prototype.constructor = Window_QuestAssenting;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestAssenting.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingX,y = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingY) {
        Window_Command.prototype.initialize.call(this,x,y);
        this.setupAssentingData();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestAssenting.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingX;
        rect.y = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingY;
        rect.width = 240;
        rect.height = this.fittingHeight(2);
        Window_Command.prototype.initialize.call(this,rect);
        this._isWindow = false;
        this.setupAssentingData();
    };
};
//--------------------------------------------------------------------------
// ● クエスト受注コマンド用のセットアップ
//--------------------------------------------------------------------------
Window_QuestAssenting.prototype.setupAssentingData = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackOpacity;
    this._globalSettings = Ayatam.QUEST.GlobalSettings;
    this._questData = null;
    this._questId = null;
    this._board = false;
    this.winSkin();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_QuestAssenting.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackImg.UsePicture) return;
    this._spriteAssentingBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteAssentingBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteAssentingBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteAssentingBg.x = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackImg.PictureX;
    this._spriteAssentingBg.y = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackImg.Anchor) {
        this._spriteAssentingBg.anchor.x = 0.5;
        this._spriteAssentingBg.anchor.y = 0.5;
    };
    this._spriteAssentingBg.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.AssentingBackImg.PictureOpacity;
    this.addChildToBack(this._spriteAssentingBg);
};
//--------------------------------------------------------------------------
// ● クエストデータの読み込み
//--------------------------------------------------------------------------
Window_QuestAssenting.prototype.setQuest = function(quest) {
    if(this._questData === quest) return;
    this._questData = quest;
    if(quest !== null) this._questId = quest._id;
    this._page = 1;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエストデータの参照
//--------------------------------------------------------------------------
Window_QuestAssenting.prototype.questData = function() {
    return this._questData;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスかを保存
//--------------------------------------------------------------------------
Window_QuestAssenting.prototype.setBoard = function(isBoard) {
    if(this._board === isBoard) return;
    this._board = isBoard;
};
//--------------------------------------------------------------------------
// ● クエストボードからのアクセスを参照
//--------------------------------------------------------------------------
Window_QuestAssenting.prototype.fromBoard = function() {
    return this._board;
};
//--------------------------------------------------------------------------
// ● コマンドリストの作成
//--------------------------------------------------------------------------
Window_QuestAssenting.prototype.makeCommandList = function() {
    if(this._questData === null) return;
    if(this._globalSettings === undefined) {
        this.addCommand('受注','ok',true);
        this.addCommand('キャンセル','cancel');
    }else{
        if(this._globalSettings.QuestAssentCommand === "") {
            this.addCommand('受注','ok',true);
            this.addCommand('キャンセル','cancel');
        }else{
            this.addCommand(this._globalSettings.QuestAssentCommand[0],'ok',true);
            this.addCommand(this._globalSettings.QuestAssentCommand[1],'cancel');
        };
    };
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_QuestAssenting.prototype.drawItem = function(index) {
    if(Utils.RPGMAKER_NAME === "MV") {
        var rect = this.itemRectForText(index);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var rect = this.itemLineRect(index);
    };
    var align = 'center';
    this.resetTextColor();
    if(Ayatam.QUEST.GlobalSettings !== undefined) {
        if(Ayatam.QUEST.GlobalSettings.FontSetup !== "") {
            if(Ayatam.QUEST.GlobalSettings.FontSetup.FontName !== "") this.contents.fontFace = Ayatam.QUEST.GlobalSettings.FontSetup.FontName;
            this.contents.fontSize = Ayatam.QUEST.GlobalSettings.FontSetup.FontSize;
        };
    };
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

//=============================================================================
// Window_QuestReporting - クエスト報告コマンドウィンドウ
//=============================================================================

//--------------------------------------------------------------------------
// ● クエスト報告コマンドウィンドウのオブジェクト初期化
//--------------------------------------------------------------------------
function Window_QuestReporting() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this.initialize.apply(this, arguments);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this.initialize(...arguments);
    };
};

Window_QuestReporting.prototype = Object.create(Window_Command.prototype);
Window_QuestReporting.prototype.constructor = Window_QuestReporting;

if(Utils.RPGMAKER_NAME === "MV") {
    Window_QuestReporting.prototype.initialize = function(x = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingX,y = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingY) {
        Window_Command.prototype.initialize.call(this,x,y);
        this.setupReportingData();
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Window_QuestReporting.prototype.initialize = function(rect) {
        rect.x = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingX;
        rect.y = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingY;
        rect.width = 240;
        rect.height = this.fittingHeight(2);
        Window_Command.prototype.initialize.call(this,rect);
        this._isWindow = false;
        this.setupReportingData();
    };
};
//--------------------------------------------------------------------------
// ● クエスト報告コマンド用のセットアップ
//--------------------------------------------------------------------------
Window_QuestReporting.prototype.setupReportingData = function() {
    this.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingOpacity;
    this.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackOpacity;
    this._globalSettings = Ayatam.QUEST.GlobalSettings;
    this._questData = null;
    this._questId = null;
    this.winSkin();
};
//--------------------------------------------------------------------------
// ● 背景画像の挿入
//--------------------------------------------------------------------------
Window_QuestReporting.prototype.winSkin = function() {
    if(!Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackImg.UsePicture) return;
    this._spriteReportingBg = new Sprite();
    var pictureDir = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackImg.PictureFile;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._spriteReportingBg.bitmap = Ayatam.QUEST.imgCashes['Quests'][pictureDir].img;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._spriteReportingBg.bitmap = ImageManager.loadQuests(pictureDir);
    };
    this._spriteReportingBg.x = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackImg.PictureX;
    this._spriteReportingBg.y = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackImg.PictureY;
    if(Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackImg.Anchor) {
        this._spriteReportingBg.anchor.x = 0.5;
        this._spriteReportingBg.anchor.y = 0.5;
    };
    this._spriteReportingBg.opacity = Ayatam.QUEST.CustamizeSettings.MenuCommand.ReportingBackImg.PictureOpacity;
    this.addChildToBack(this._spriteReportingBg);
};
//--------------------------------------------------------------------------
// ● クエストデータの読み込み
//--------------------------------------------------------------------------
Window_QuestReporting.prototype.setQuest = function(quest) {
    if(this._questData === quest) return;
    this._questData = quest;
    if(quest !== null) this._questId = quest._id;
    this._page = 1;
    this.refresh();
};
//--------------------------------------------------------------------------
// ● クエストデータの参照
//--------------------------------------------------------------------------
Window_QuestReporting.prototype.questData = function() {
    return this._questData;
};
//--------------------------------------------------------------------------
// ● コマンドリストの作成
//--------------------------------------------------------------------------
Window_QuestReporting.prototype.makeCommandList = function() {
    if(this._questData === null) return;
    if(this._globalSettings === undefined) {
        this.addCommand('報告','ok',true);
        this.addCommand('キャンセル','cancel');
    }else{
        if(this._globalSettings.QuestReportCommand === "") {
            if(this._questId !== undefined || this._questId !== null) {
                this.addCommand('報告','ok',$gameQuest.canReport(this._questId));
            }else{
                this.addCommand('報告','ok',true);
            };
            this.addCommand('キャンセル','cancel');
        }else{
            if(this._questId !== undefined || this._questId !== null) {
                this.addCommand(this._globalSettings.QuestReportCommand[0],'ok',$gameQuest.canReport(this._questId));
            }else{
                this.addCommand(this._globalSettings.QuestReportCommand[0],'ok',true);
            };
            this.addCommand(this._globalSettings.QuestReportCommand[1],'cancel');
        };
    };
};
//--------------------------------------------------------------------------
// ● 項目の描画
//--------------------------------------------------------------------------
Window_QuestReporting.prototype.drawItem = function(index) {
    if(Utils.RPGMAKER_NAME === "MV") {
        var rect = this.itemRectForText(index);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var rect = this.itemLineRect(index);
    };
    var align = 'center';
    this.resetTextColor();
    if(this._globalSettings !== undefined) {
        if(this._globalSettings.FontSetup !== "") {
            if(this._globalSettings.FontSetup.FontName !== "") this.contents.fontFace = this._globalSettings.FontSetup.FontName;
            this.contents.fontSize = this._globalSettings.FontSetup.FontSize;
        };
    };
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

//=============================================================================
// Game_System - $gameQuestの作成
//=============================================================================

var _HighQualityQuestSystem_Game_System_prototype_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _HighQualityQuestSystem_Game_System_prototype_initialize.call(this);
    if($gameQuest === null) $gameQuest = new Game_Quest();
};

//=============================================================================
// Game_Actor - キャッシュの作成
//=============================================================================

var _HighQualityQuestSystem_Game_Actor_prototype_initImages = Game_Actor.prototype.initImages;
Game_Actor.prototype.initImages = function() {
    _HighQualityQuestSystem_Game_Actor_prototype_initImages.call(this);
    if(Ayatam.QUEST.imgCashes['characters'][this._characterName] === undefined) {
        var loaded = ImageManager.loadCharacter(this._characterName);
        var Big = ImageManager.isBigCharacter(this._characterName);
        Ayatam.QUEST.imgCashes['characters'][this._characterName] = { img: loaded , isBig: Big };
    };
};

//--------------------------------------------------------------------------
// ● DataManager - ニューゲーム時の初期化
//--------------------------------------------------------------------------
var _HighQualityQuestSystem_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    _HighQualityQuestSystem_DataManager_setupNewGame.call(this);
    if($gameQuest !== null) $gameQuest.resetAllQuest();
};
//--------------------------------------------------------------------------
// ● DataManager - クエストデータの保存
//--------------------------------------------------------------------------
var _HighQualityQuestSystem_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = _HighQualityQuestSystem_DataManager_makeSaveContents.call(this);
    contents.partyQuests = this.makeAyatamQuestSave($gameParty._quests);
    contents.partyNav = $gameParty._questNav;
    return contents;
};
//--------------------------------------------------------------------------
// ● DataManager - クエストデータ専用の保存機構
//--------------------------------------------------------------------------
DataManager.makeAyatamQuestSave = function(questSave) {
    var makeQuestSave = [];
    var questData = Ayatam.QUEST.QuestDatabase;
    if(questData.length === 0) {
        console.error('高機能クエストシステム MV : Error :\nクエストのデータベースが空っぽのため、クエストデータの保存に失敗しました。\nCouldn`t make quest save object.\nReason:Quest database is empty.');
        require('nw.gui').Window.get().showDevTools();
        AudioManager.playSe({ "name": "Computer", "volume": 70, "pitch": 100, "pan": 0 });
        return ['errorSaving'];
    };
    for(var i = 0; i < questData.length; ++i) {
        makeQuestSave[i + 1] = { questId: 'quest' + (i + 1) , assent: questSave['quest' + (i + 1)]['assent'] , reported: questSave['quest' + (i + 1)]['reported'], failed: false };
        if(Ayatam.QUEST.GlobalSettings.FailingQuestMode) {
            makeQuestSave[i + 1].failed = questSave['quest' + (i + 1)]['failed'];
        };
        var objectives = questData[i].QuestObjectiveSettings;
        for(var set = 0; set < objectives.length; ++ set) {
            var sid = questSave['quest' + (i + 1)]['set' + (set + 1)]._id;
            var scontent = questSave['quest' + (i + 1)]['set' + (set + 1)]._content;
            var scontentType = questSave['quest' + (i + 1)]['set' + (set + 1)]._contentType;
            var scontentId = questSave['quest' + (i + 1)]['set' + (set + 1)]._contentId;
            var sitemSelect = questSave['quest' + (i + 1)]['set' + (set + 1)]._itemSelect;
            var sfinishAmount = questSave['quest' + (i + 1)]['set' + (set + 1)]._finishAmount;
            var sfinishCommonEvent = questSave['quest' + (i + 1)]['set' + (set + 1)]._finishCommonEvent;
            var sindex = questSave['quest' + (i + 1)]['set' + (set + 1)]._index;
            var starget = questSave['quest' + (i + 1)]['set' + (set + 1)]._target;
            var sactivatedIcon = questSave['quest' + (i + 1)]['set' + (set + 1)]._objectiveIcons.ObjectiveActivatedIcon;
            var sclearedIcon = questSave['quest' + (i + 1)]['set' + (set + 1)]._objectiveIcons.ObjectiveClearedIcon;
            var sfailedIcon = questSave['quest' + (i + 1)]['set' + (set + 1)]._objectiveIcons.ObjectiveFailedIcon;
            if(makeQuestSave[i + 1].objective === undefined) makeQuestSave[i + 1].objective = [];
            makeQuestSave[i + 1].objective[set + 1] = { id: sid , content: scontent , contentType: scontentType , contentId: scontentId , itemSelect: sitemSelect , finishAmount: sfinishAmount , finishCommonEvent: sfinishCommonEvent , index: sindex , target: starget , activatedIcon: sactivatedIcon , clearedIcon: sclearedIcon , failedIcon: sfailedIcon};
        };
    };
    return makeQuestSave;
};
//--------------------------------------------------------------------------
// ● DataManager - データロード時にクエストの更新情報を取得
//--------------------------------------------------------------------------
var _HighQualityQuestSystem_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _HighQualityQuestSystem_DataManager_extractSaveContents.call(this, contents);
    $gameParty._quests = this.extractAyatamQuestSave(contents.partyQuests);
    $gameParty._questNav = contents.partyNav;
    $gameMap.checkDailyQuests();
};
//--------------------------------------------------------------------------
// ● DataManager - クエストデータ専用の読み込み機構「リロード機能付き」
//--------------------------------------------------------------------------
DataManager.extractAyatamQuestSave = function(questSave) {
    var extractQuestSave = [];
    extractQuestSave[0] = null;
    var questData = Ayatam.QUEST.QuestDatabase;
    if(questData.length === 0) {
        console.error('高機能クエストシステム MV : Error :\nクエストのデータベースが空っぽのため、クエストデータの読み込みに失敗しました。\nCouldn`t load quest save object.\nReason:Quest database is empty.');
        require('nw.gui').Window.get().showDevTools();
        AudioManager.playSe({ "name": "Computer", "volume": 70, "pitch": 100, "pan": 0 });
        return ['errorLoading'];
    };
    for(var i = 0; i < questData.length; ++i) {
        if(questSave[i + 1] === undefined) {//新規データ取得時 新規データの読み込み
            extractQuestSave['quest' + (i + 1)] = [];
            extractQuestSave['quest' + (i + 1)]['assent'] = false;
            extractQuestSave['quest' + (i + 1)]['reported'] = false;
            if(Ayatam.QUEST.GlobalSettings.FailingQuestMode) {
                extractQuestSave['quest' + (i + 1)]['failed'] = false;
            };
            var objectives = questData[i].QuestObjectiveSettings;
            for(var set = 0; set < objectives.length; ++ set) {
                extractQuestSave['quest' + (i + 1)]['set' + (set + 1)] = new Quest_Objectives(set + 1,'set' + (set + 1),objectives[set]);
            };
        }else{//既存データ取得時 ユーザーデータが更新されている場合、更新する。
            extractQuestSave[questSave[i + 1].questId] = [];
            extractQuestSave[questSave[i + 1].questId]['assent'] = questSave[i + 1].assent;
            extractQuestSave[questSave[i + 1].questId]['reported'] = questSave[i + 1].reported;
            if(Ayatam.QUEST.GlobalSettings.FailingQuestMode) {
                extractQuestSave[questSave[i + 1].questId]['failed'] = questSave[i + 1].failed;
            };
            var objectives = questData[i].QuestObjectiveSettings;
            for(var set = 0; set < objectives.length; ++ set) {//最初に更新情報を取得し、データが異なればなにもさせず更新データを利用する。
                extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id] = new Quest_Objectives(set + 1,'set' + (set + 1),objectives[set]);
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._content === questSave[i + 1].objective[set + 1].content) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._content = questSave[i + 1].objective[set + 1].content;
                };
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._contentType === questSave[i + 1].objective[set + 1].contentType) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._contentType = questSave[i + 1].objective[set + 1].contentType;
                };
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._contentId === questSave[i + 1].objective[set + 1].contentId) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._contentId = questSave[i + 1].objective[set + 1].contentId;
                };
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._itemSelect === questSave[i + 1].objective[set + 1].itemSelect) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._itemSelect = questSave[i + 1].objective[set + 1].itemSelect;
                };
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._finishAmount === questSave[i + 1].objective[set + 1].finishAmount) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._finishAmount = questSave[i + 1].objective[set + 1].finishAmount;
                };
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._finishCommonEvent === questSave[i + 1].objective[set + 1].finishCommonEvent) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._finishCommonEvent = questSave[i + 1].objective[set + 1].finishCommonEvent;
                };
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._objectiveIcons.ObjectiveActivatedIcon === questSave[i + 1].objective[set + 1].activatedIcon) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._objectiveIcons.ObjectiveActivatedIcon = questSave[i + 1].objective[set + 1].activatedIcon;
                };
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._objectiveIcons.ObjectiveClearedIcon === questSave[i + 1].objective[set + 1].clearedIcon) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._objectiveIcons.ObjectiveClearedIcon = questSave[i + 1].objective[set + 1].clearedIcon;
                };
                if(extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._objectiveIcons.ObjectiveFailedIcon === questSave[i + 1].objective[set + 1].failedIcon) {
                    extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._objectiveIcons.ObjectiveFailedIcon = questSave[i + 1].objective[set + 1].failedIcon;
                };
                extractQuestSave[questSave[i + 1].questId][questSave[i + 1].objective[set + 1].id]._target = questSave[i + 1].objective[set + 1].target;
                //最終獲得量の保存
                $gameQuest._questData[questSave[i + 1].questId].setLastObjAmount(questSave[i + 1].objective[set + 1].id,questSave[i + 1].objective[set + 1].target);
            };
        };
    };
    return extractQuestSave;
};

//=============================================================================
// Game_Variables - 変数監視
//=============================================================================

var _HighQualityQuestSystem_Game_Variables_prototype_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId,value) {
    _HighQualityQuestSystem_Game_Variables_prototype_setValue.call(this,variableId,value);
    this.checkQuestObjects();
};

Game_Variables.prototype.checkQuestObjects = function() {
    if($gameQuest.getAllAssentedQuests() === null) return;
    $gameQuest.getAllAssentedQuests().forEach(quest => {
        if($gameQuest.getAllObjectives(quest._id) !== null) {
            $gameQuest.getAllObjectives(quest._id).forEach(set => {
                if(set._contentType === 'valquest') {
                    var amount = this.value(set._contentId);
                    if(SceneManager._scene.constructor !== Scene_Map) {
                        Ayatam.QUEST.insObjSilent(quest._id,set._id,amount,true);
                    }else{
                        Ayatam.QUEST.insObjSilent(quest._id,set._id,amount);
                    };
                };
            });
        };
    });
};

//=============================================================================
// Sprite_Battler - 討伐監視
//=============================================================================

var _HighQualityQuestSystem_Sprite_Battler_prototype_initialize = Sprite_Battler.prototype.initialize;
Sprite_Battler.prototype.initialize = function(battler) {
    _HighQualityQuestSystem_Sprite_Battler_prototype_initialize.call(this,battler);
    this.setupQuestEnemyCondition();
};

Sprite_Battler.prototype.setupQuestEnemyCondition = function() {
    this._oldCheckEnemyCondition = false;
};

var _HighQualityQuestSystem_Sprite_Battler_prototype_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    _HighQualityQuestSystem_Sprite_Battler_prototype_update.call(this);
    if(!this._battler) return;
    if(this._battler.constructor !== Game_Enemy) return;
    this.checkEnemyCondition();
};

Sprite_Battler.prototype.checkEnemyCondition = function() {
    if(!this._battler.isDead()) return;
    if(this._oldCheckEnemyCondition !== this._battler.isDead()) {
        if($gameQuest.getAllAssentedQuests() !== null) {
            $gameQuest.getAllAssentedQuests().forEach(quest => {
                if($gameQuest.getAllObjectives(quest._id) !== null) {
                    $gameQuest.getAllObjectives(quest._id).forEach(set => {
                        if(set._contentType === 'killquest') {
                            if(this._battler._enemyId === set._contentId) {
                                Ayatam.QUEST.addObj(quest._id,set._id,1);
                            };
                        };
                    });
                };
            });
        };
        this._oldCheckEnemyCondition = this._battler.isDead();
    };
};

//=============================================================================
// Game_Party - アイテム取得監視
//=============================================================================

var _HighQualityQuestSystem_Game_Party_prototype_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item,amount,includeEquip) {
    _HighQualityQuestSystem_Game_Party_prototype_gainItem.call(this,item,amount,includeEquip);
    this.checkQuestObjects();
};

Game_Party.prototype.checkQuestObjects = function() {
    if($gameQuest.getAllAssentedQuests() === null) return;
    $gameQuest.getAllAssentedQuests().forEach(quest => {
        if($gameQuest.getAllObjectives(quest._id) !== null) {
            $gameQuest.getAllObjectives(quest._id).forEach(set => {
                if(set._contentType === 'itemquest') {
                    if(set._itemSelect === 'Item') {
                        var amount = this.numItems($dataItems[set._contentId]);
                        if(SceneManager._scene.constructor !== Scene_Map) {
                            Ayatam.QUEST.insObjSilent(quest._id,set._id,amount,true);
                        }else{
                            Ayatam.QUEST.insObjSilent(quest._id,set._id,amount);
                        };
                    }else if(set._itemSelect === 'Weapon') {
                        var amount = this.numItems($dataWeapons[set._contentId]);
                        if(SceneManager._scene.constructor !== Scene_Map) {
                            Ayatam.QUEST.insObjSilent(quest._id,set._id,amount,true);
                        }else{
                            Ayatam.QUEST.insObjSilent(quest._id,set._id,amount);
                        };
                    }else if(set._itemSelect === 'Armor') {
                        var amount = this.numItems($dataArmors[set._contentId]);
                        if(SceneManager._scene.constructor !== Scene_Map) {
                            Ayatam.QUEST.insObjSilent(quest._id,set._id,amount,true);
                        }else{
                            Ayatam.QUEST.insObjSilent(quest._id,set._id,amount);
                        };
                    };
                };
            });
        };
    });
};

//=============================================================================
// Game_Map - その他機能監視
//=============================================================================

Ayatam.QUEST.insObjSilent = function(questId,setId,amount,counter = false) {
    $gameQuest.questInsObj(questId,setId,amount,counter);
    if(SceneManager._scene.constructor !== Scene_Map) return;
    SceneManager._scene.QuestNavNeedRefresh();
};

var _HighQualityQuestSystem_Game_Map_prototype_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _HighQualityQuestSystem_Game_Map_prototype_initialize.call(this);
    if(this._questMonth === undefined) this._questMonth = null;
    if(this._questDay === undefined) this._questDay = null;
};

var _HighQualityQuestSystem_Game_Map_prototype_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    _HighQualityQuestSystem_Game_Map_prototype_update.call(this,sceneActive);
    this.checkReservedCommons();
};

Game_Map.prototype.checkReservedCommons = function() {
    if($gameQuest.getAllQuests().length === 0) return;
    var id = 0;
    $gameQuest.getAllQuests().forEach(quest => {
        ++id;
        if($gameQuest.isAssented('quest' + id)) this.executeReservedCommons($gameQuest.findQuest('quest' + id));
    });
};

Game_Map.prototype.executeReservedCommons = function(quest) {
    if(quest.allQuestCommonExecuted()) return;
    if(!this.isEventRunning()) {
        if(quest.reservedCommonExist() !== undefined) {
            $gameTemp.reserveCommonEvent(quest.reservedCommonExist().commonId);
            quest.commonEventHasExecuted(quest.reservedCommonExist());
        };
    };
};

var _HighQualityQuestSystem_Game_Map_prototype_refresh = Game_Map.prototype.refresh;
Game_Map.prototype.refresh = function() {
    _HighQualityQuestSystem_Game_Map_prototype_refresh.call(this);
    this.checkDailyQuests();
    Ayatam.QUEST.needsRefresh = true;
};

Game_Map.prototype.checkDailyQuests = function() {
    var time = new Date();
    var month = time.getMonth();
    var day = time.getDate();
    if(this._questMonth === month) {
        if(this._questDay === day) return;
    };
    if($gameQuest.getAllReportedQuests() !== null) {
        $gameQuest.getAllReportedQuests().forEach(quest => {
            if(quest._questDailyQuest) {
                $gameQuest.resetQuest(quest._id);
            };
        });
    };
    if(Ayatam.QUEST.GlobalSettings.FailingQuestMode) {
        if($gameQuest.getAllFailedQuests() !== null) {
           $gameQuest.getAllFailedQuests().forEach(quest => {
               if(quest._questDailyQuest) {
                   $gameQuest.resetQuest(quest._id);
               };
           }); 
        };
    };
    this._questMonth = month;
    this._questDay = day;
};

//=============================================================================
// Game_Event - インディケートアイコンの登録
//=============================================================================

var _HighQualityQuestSystem_Game_Event_prototype_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    _HighQualityQuestSystem_Game_Event_prototype_setupPageSettings.call(this);
    this.clearSelfIconFlag();
    this.setupFlagIcons();
};

var _HighQualityQuestSystem_Game_Event_prototype_clearPageSettings = Game_Event.prototype.clearPageSettings;
Game_Event.prototype.clearPageSettings = function() {
    _HighQualityQuestSystem_Game_Event_prototype_clearPageSettings.call(this);
};

Game_Event.prototype.setupFlagIcons = function() {
    var list = this.list();
    var questTypeStay = false;
    var noteIsObjective = false;
    for(var i = 0; i < list.length; ++i) {
        if(list[i].code === 108) {
            if(list[i].parameters[0].match(/<quest: (.*), (.*), (.*)>/i)) {
                var flagIconInfo = list[i].parameters[0].match(/<quest: (.*), (.*), (.*)>/i);
                noteIsObjective = false;
                questTypeStay = false;
            }else if(list[i].parameters[0].match(/<questStay: (.*), (.*), (.*)>/i)) {
                var flagIconInfo = list[i].parameters[0].match(/<questStay: (.*), (.*), (.*)>/i);
                noteIsObjective = false;
                questTypeStay = true;
            }else if(list[i].parameters[0].match(/<questObj: (.*), (.*), (.*), (.*)>/i)) {
                var flagIconInfo = list[i].parameters[0].match(/<questObj: (.*), (.*), (.*), (.*)>/i);
                noteIsObjective = true;
                questTypeStay = false;
            };
            if(flagIconInfo) {
                if(!noteIsObjective) {
                    var questFlagIcon = $gameQuest.findQuest(flagIconInfo[1]).questIcon();
                    var questClearIcon = Ayatam.QUEST.GlobalSettings.QuestClearFlag;
                    var RootQuest = $gameQuest.findQuest(flagIconInfo[1]).isRootQuest();
                    var flagIcon = { eventId: this._eventId , questId: flagIconInfo[1] , setId: null , iconFlagId: questFlagIcon, iconActiveId: 0 , iconClearId: questClearIcon , posX: flagIconInfo[2], posY: flagIconInfo[3] , isRootQuest: RootQuest, isFlagTypeStay: questTypeStay};
                    $gameParty._mapIcons.push(flagIcon);
                    break;
                }else{
                    var questActiveIcon = Ayatam.QUEST.GlobalSettings.QuestActiveFlag;
                    var questClearIcon = Ayatam.QUEST.GlobalSettings.QuestClearFlag;
                    var RootQuest = $gameQuest.findQuest(flagIconInfo[1]).isRootQuest();
                    var flagIcon = { eventId: this._eventId , questId: flagIconInfo[1] , setId: flagIconInfo[2] , iconFlagId: 0, iconActiveId: questActiveIcon , iconClearId: questClearIcon , posX: flagIconInfo[3], posY: flagIconInfo[4] , isRootQuest: RootQuest, isFlagTypeStay: questTypeStay};
                    $gameParty._mapIcons.push(flagIcon);
                    break;
                };
            };
        };
    };
};

Game_Event.prototype.clearSelfIconFlag = function() {
    if($gameParty._mapIcons.length === 0) return;
    var getIndex = -1;
    for(var i = 0; i < $gameParty._mapIcons.length; ++i) {
        if($gameParty._mapIcons[i].eventId === this._eventId) {
            getIndex = i;
            break;
        };
    };
    if(getIndex !== -1) {
        $gameParty._mapIcons.splice(getIndex,1);
    };
};

//=============================================================================
// Spriteset_Map - アイコンの表示レイヤーを作成
//=============================================================================

var _HighQualityQuestSystem_Spriteset_Map_prototype_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    _HighQualityQuestSystem_Spriteset_Map_prototype_createLowerLayer.call(this);
    this.createQuestFlagIcons();
};

Spriteset_Map.prototype.createQuestFlagIcons = function() {
    this._ayatamQuestIconSprite = [];
    var id = 0;
    if($gameParty.getQuestMapIcon() === null) return;
    $gameParty.getQuestMapIcon().forEach(icons => {
        this._ayatamQuestIconSprite[id] = new Sprite_AyatamQuestIcon(icons);
        this._tilemap.addChild(this._ayatamQuestIconSprite[id]);
        ++id;
    });
};

var _HighQualityQuestSystem_Spriteset_Map_prototype_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    _HighQualityQuestSystem_Spriteset_Map_prototype_update.call(this);
    if(Ayatam.QUEST.needsRefresh) {
        this.refreshIcons();
        Ayatam.QUEST.needsRefresh = false;
    };
};

Spriteset_Map.prototype.refreshIcons = function() {
    if(this._ayatamQuestIconSprite !== undefined || this._ayatamQuestIconSprite.length !== 0) {
        this._ayatamQuestIconSprite.forEach(icons => {
            this._tilemap.removeChild(icons);
        });
    };
    this.createQuestFlagIcons();
};

//=============================================================================
// Sprite_AyatamQuestIcon - クエストアイコンスプライト
//=============================================================================

function Sprite_AyatamQuestIcon() {
    this.initialize.apply(this,arguments);
};

Sprite_AyatamQuestIcon.prototype = Object.create(Sprite.prototype);
Sprite_AyatamQuestIcon.prototype.constructor = Sprite_AyatamQuestIcon;

Sprite_AyatamQuestIcon.prototype.initialize = function(icon) {
    Sprite.prototype.initialize.call(this);
    this._iconIndex = 0;
    this._questFlagTypeStay = icon.isFlagTypeStay;
    this._eventId = icon.eventId;
    this._questId = icon.questId;
    this._setId = icon.setId;
    this._isRootQuest = icon.isRootQuest;
    this._iconFlagId = icon.iconFlagId;
    this._iconActiveId = icon.iconActiveId;
    this._iconClearId = icon.iconClearId;
    this._tileWidth = $gameMap.tileWidth();
    this._tileHeight = $gameMap.tileHeight();
    if(Utils.RPGMAKER_NAME === "MV") {
        this._offsetX = -(Window_Base._iconWidth / 2) + Number(icon.posX);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._offsetX = -(ImageManager.iconWidth / 2) + Number(icon.posX);
    };
    this._offsetY = -42 + Number(icon.posY);
    this.anchor.y = 1;
    this._float = 0.1;
    this.z = 5;
    this.opacity = 255;
    this._maxFloat = 0.3;
    this.setMapIcon();
};

Sprite_AyatamQuestIcon.prototype.setMapIcon = function() {
    if(this._eventId <= 0) return;
    this._iconIndex = 0;
    if(Ayatam.QUEST.GlobalSettings.FailingQuestMode) {//失敗モード時
        if($gameQuest.canAssent(this._questId)) {
            this._iconIndex = this._iconFlagId;
        }else if($gameQuest.isAssented(this._questId) && !$gameQuest.canReport(this._questId) && !$gameQuest.isReported(this._questId) && !$gameQuest.isFailed(this._questId)) {
            if(this._setId !== null) {
                if(this._isRootQuest) {//ルートクエスト
                    var set = this._setId.split('set');
                    var resultSet = Number(set[1]) - 1;
                    if(resultSet <= 0) {
                        if(!$gameParty.questObjectives(this._questId,'set1').cleared()) {
                            this._iconIndex = this._iconActiveId;
                        }else{
                            this._iconIndex = 0;
                        };
                    }else{
                        if(!$gameParty.questObjectives(this._questId,this._setId).cleared()) {
                            if($gameParty.questObjectives(this._questId,'set' + resultSet).cleared()) {
                                this._iconIndex = this._iconActiveId;
                            }else{
                                this._iconIndex = 0;
                            };
                        }else{
                            this._iconIndex = 0;
                        };
                    };
                }else{//通常クエスト
                    if(!$gameParty.questObjectives(this._questId,this._setId).cleared()) {
                        this._iconIndex = this._iconActiveId;
                    }else{
                        this._iconIndex = 0;
                    };
                };
            }else{//オブジェクト無関係
                if(this._questFlagTypeStay && this._iconFlagId !== 0) {
                    this._iconIndex = this._iconFlagId;
                }else{
                    this._iconIndex = 0;
                };
            };
        }else if($gameQuest.canReport(this._questId) && !$gameQuest.isFailed(this._questId)) {
            if(this._setId === null) {
                this._iconIndex = this._iconClearId;
            }else{
                this._iconIndex = 0;
            };
        };
    }else{//通常モード時
        if($gameQuest.canAssent(this._questId)) {
            this._iconIndex = this._iconFlagId;
        }else if($gameQuest.isAssented(this._questId) && !$gameQuest.canReport(this._questId) && !$gameQuest.isReported(this._questId)) {
            if(this._setId !== null) {
                if(this._isRootQuest) {//ルートクエスト
                    var set = this._setId.split('set');
                    var resultSet = Number(set[1]) - 1;
                    if(resultSet <= 0) {
                        if(!$gameParty.questObjectives(this._questId,'set1').cleared()) {
                            this._iconIndex = this._iconActiveId;
                        }else{
                            this._iconIndex = 0;
                        };
                    }else{
                        if(!$gameParty.questObjectives(this._questId,this._setId).cleared()) {
                            if($gameParty.questObjectives(this._questId,'set' + resultSet).cleared()) {
                                this._iconIndex = this._iconActiveId;
                            }else{
                                this._iconIndex = 0;
                            };
                        }else{
                            this._iconIndex = 0;
                        };
                    };
                }else{//通常クエスト
                    if(!$gameParty.questObjectives(this._questId,this._setId).cleared()) {
                        this._iconIndex = this._iconActiveId;
                    }else{
                        this._iconIndex = 0;
                    };
                };
            }else{//オブジェクト無関係
                if(this._questFlagTypeStay && this._iconFlagId !== 0) {
                    this._iconIndex = this._iconFlagId;
                }else{
                    this._iconIndex = 0;
                };
            };
        }else if($gameQuest.canReport(this._questId)) {
            if(this._setId === null) {
                this._iconIndex = this._iconClearId;
            }else{
                this._iconIndex = 0;
            };
        };
    };
    if(Utils.RPGMAKER_NAME === "MV") {
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        var pw = ImageManager.iconWidth;
        var ph = ImageManager.iconHeight;
    };
    var sx = this._iconIndex % 16 * pw;
    var sy = Math.floor(this._iconIndex / 16) * ph;
    this.bitmap = new Bitmap(pw,ph);
    if(this._iconIndex <= 0) return;
    var bitmap = ImageManager.loadSystem('IconSet');
    this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
};

Sprite_AyatamQuestIcon.prototype.refreshIcons = function() {
    this.setMapIcon();//未使用、念のため
};

Sprite_AyatamQuestIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if(this._eventId <= 0) return;
    if(this._iconIndex <= 0) return;
    this.x = $gameMap.event(this._eventId).screenX() + this._offsetX;
    this.y = $gameMap.event(this._eventId).screenY() + this._offsetY + this._float;
    this._float += this._maxFloat;
    if(this._float < -0.1) {
        this._maxFloat = Math.min(this._maxFloat + 0.01,0.3);
    }else if(this._float >= 0.1) {
        this._maxFloat = Math.max(this._maxFloat + -0.01,-0.3);
    };
};

//=============================================================================
// WindowLayer - マスク除去 MV用
//=============================================================================
if(Utils.RPGMAKER_NAME === "MV") {
    var _HighQualityQuestSystem_WindowLayer_prototype_initialize = WindowLayer.prototype.initialize;
    WindowLayer.prototype.initialize = function() {
        _HighQualityQuestSystem_WindowLayer_prototype_initialize.call(this);
        this._allMaskCut = false;
    };

    var _HighQualityQuestSystem_WindowLayer_prototype_maskWindow = WindowLayer.prototype._maskWindow;
    WindowLayer.prototype._maskWindow = function(window, shift) {
        if(this._allMaskCut) {
            var rect = this._windowRect;
            rect.x = 0;
            rect.y = 0;
            rect.width = 0;
            rect.height = 0;
        }else{
            _HighQualityQuestSystem_WindowLayer_prototype_maskWindow.call(this, window, shift);
        };
    };

    //=============================================================================
    // Scene_Base - マスク除去切り替えコマンド
    //=============================================================================

    Scene_Base.prototype.enableAllMaskCut = function() {
        this._windowLayer._allMaskCut = true;
    };

    Scene_Base.prototype.disableAllMaskCut = function() {
        this._windowLayer._allMaskCut = false;
    };
};

//=============================================================================
// Game_Interpreter - Fiber.Yield の登録
//=============================================================================

var _HighQualityQuestSystem_Game_Interpreter_prototype_updateChild = Game_Interpreter.prototype.updateChild;
Game_Interpreter.prototype.updateChild = function() {
    return $gameQuest.fiberYield() ? true : _HighQualityQuestSystem_Game_Interpreter_prototype_updateChild.call(this);
};

//=============================================================================
// Game_System - Fiber.Yield の登録
//=============================================================================

var _HighQualityQuestSystem_Game_System_prototype_isMenuEnabled = Game_System.prototype.isMenuEnabled;
Game_System.prototype.isMenuEnabled = function() {
    return $gameQuest.fiberYield() ? false : _HighQualityQuestSystem_Game_System_prototype_isMenuEnabled.call(this);
};

//=============================================================================
// Game_Player - Fiber.Yield の登録
//=============================================================================

var _HighQualityQuestSystem_Game_Player_prototype_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
    if(!$gameQuest.fiberYield()) _HighQualityQuestSystem_Game_Player_prototype_executeMove.call(this,direction);
};

var _HighQualityQuestSystem_Game_Player_prototype_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function() {
    return $gameQuest.fiberYield() ? false : _HighQualityQuestSystem_Game_Player_prototype_triggerButtonAction.call(this);
};

var _HighQualityQuestSystem_Game_Player_prototype_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
Game_Player.prototype.triggerTouchAction = function() {
    return $gameQuest.fiberYield() ? false : _HighQualityQuestSystem_Game_Player_prototype_triggerTouchAction.call(this);
};

//=============================================================================
// Game_Player - マップアイコンの初期化
//=============================================================================

var _HighQualityQuestSystem_Game_Player_prototype_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    _HighQualityQuestSystem_Game_Player_prototype_reserveTransfer.call(this,mapId,x,y,d,fadeType);
    $gameParty.clearQuestMapIcon();
};

//=============================================================================
// Scene_Menu - クエストコマンドの定義
//=============================================================================

var _HighQualityQuestSystem_Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _HighQualityQuestSystem_Scene_Menu_prototype_createCommandWindow.call(this);
    this._commandWindow.setHandler('quest', this.openQuest.bind(this));
};

Scene_Menu.prototype.openQuest = function() {
    SceneManager.push(Scene_QuestMenu);
};

//=============================================================================
// Window_MenuCommand - クエストコマンドの登録
//=============================================================================

var _HighQualityQuestSystem_Window_MenuCommand_prototype_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    _HighQualityQuestSystem_Window_MenuCommand_prototype_addOriginalCommands.call(this);
    this.addQuestCommand();
};

Window_MenuCommand.prototype.addQuestCommand = function() {
    if(!Ayatam.QUEST.GlobalSettings.MenuCommandInformation.AddToMenuCommand) return;
    this.addCommand(Ayatam.QUEST.GlobalSettings.MenuCommandInformation.QuestMenuCommandName,'quest',$gameQuest.canOpenQuestMenu());
};

//=============================================================================
// Game_Temp - ナビゲーターのコール状況
//=============================================================================

Game_Temp.prototype.canselNavDraw = function() {
    return this._canselNavDraw;
};

Game_Temp.prototype.canselNavDrawFlag = function(key) {
    this._canselNavDraw = key;
};

Game_Temp.prototype.userNavMapKey = function() {
    if(this._userNavMapKeyPressed === undefined) return false;
    return this._userNavMapKeyPressed;
};

Game_Temp.prototype.userNavMapKeyPressed = function(key) {
    this._userNavMapKeyPressed = key;
};

//=============================================================================
// Game_Party - クエスト保存用データ
//=============================================================================

//--------------------------------------------------------------------------
// ● Game_Party に クエスト保存用データを追加
//--------------------------------------------------------------------------
var _HighQualityQuestSystem_Game_Party_protoype_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    _HighQualityQuestSystem_Game_Party_protoype_initialize.call(this);
    this.setupAyatamQuest();
};
//--------------------------------------------------------------------------
// ● クエストデータのセットアップ
//--------------------------------------------------------------------------
Game_Party.prototype.setupAyatamQuest = function() {
    if($gameQuest !== null) this._quests = $gameQuest.questInformation();
    if(this._questNav === undefined) this._questNav = null;
    this._mapIcons = [];
    this.setupAyatamQuestGlobal();
};
//=============================================================================
// Game_Party - マップアイコンの取得
//=============================================================================
Game_Party.prototype.getQuestMapIcon = function() {
    if(this._mapIcons.length === 0) return null;
    return this._mapIcons;
};
//=============================================================================
// Game_Party - マップアイコンの初期化
//=============================================================================
Game_Party.prototype.clearQuestMapIcon = function() {
    this._mapIcons = [];
};
//--------------------------------------------------------------------------
// ● 基本設定の読み込み
//--------------------------------------------------------------------------
Game_Party.prototype.setupAyatamQuestGlobal = function() {
    var global = Ayatam.QUEST.GlobalSettings;
    if(global.FailingQuestMode === "") global.FailingQuestMode = false;
    if(global.NoNaviQuestMode === "") global.NoNaviQuestMode = false;
    this._questFailingMode = global.FailingQuestMode;
    this._questNoUseNavi = global.NoNaviQuestMode;
};
//--------------------------------------------------------------------------
// ● クエスト保存用データの参照
//--------------------------------------------------------------------------
Game_Party.prototype.quests = function() {
    if(this._quests === null) return null;
    return this._quests;
};
//--------------------------------------------------------------------------
// ● クエスト保存用データの目的を参照
//--------------------------------------------------------------------------
Game_Party.prototype.questObjectives = function(questId,setId) {
    if(this._quests === null) return null;
    return this._quests[questId][setId];
};
//--------------------------------------------------------------------------
// ● クエスト受注状態の設定
//--------------------------------------------------------------------------
Game_Party.prototype.questSetAssent = function(questId,con) {
    if(this._quests === null) return null;
    this._quests[questId]['assent'] = con;
};
//--------------------------------------------------------------------------
// ● クエスト報告状態の設定
//--------------------------------------------------------------------------
Game_Party.prototype.questSetReported = function(questId,con) {
    if(this._quests === null) return null;
    this._quests[questId]['reported'] = con;
};
//--------------------------------------------------------------------------
// ● クエスト失敗状態の設定
//--------------------------------------------------------------------------
Game_Party.prototype.questSetFailed = function(questId,con) {
    if(this._quests === null) return null;
    if(!this._questFailingMode) return;
    this._quests[questId]['failed'] = con;
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターを参照
//--------------------------------------------------------------------------
Game_Party.prototype.getNav = function() {
    if(this._quests === null) return;
    if(this._questNoUseNavi) return;
    return this._questNav;
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターへクエストを設定
//--------------------------------------------------------------------------
Game_Party.prototype.setNav = function(questId = null) {
    if(this._quests === null) return;
    if(this._questNoUseNavi) return;
    if(this._questNav === questId) return;
    this._questNav = questId;
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターからクエストを除外
//--------------------------------------------------------------------------
Game_Party.prototype.unSetNav = function(questId = null) {
    if(this._quests === null) return;
    if(this._questNoUseNavi) return;
    if(this._questNav !== questId) return;
    this._questNav = null;
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターの参照
//--------------------------------------------------------------------------
Game_Party.prototype.questInNavi = function() {
    if(this._quests === null) return;
    if(this._questNoUseNavi) return null;
    return this._questNav !== null;
};

//=============================================================================
// Scene_QuestMenu - クエストメニューシーン
//=============================================================================

//--------------------------------------------------------------------------
// ● クエストメニューシーンのオブジェクト初期化
//--------------------------------------------------------------------------
function Scene_QuestMenu() {
    this.initialize.apply(this,arguments);
};

Scene_QuestMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_QuestMenu.prototype.constructor = Scene_QuestMenu;

Scene_QuestMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//--------------------------------------------------------------------------
// ● クエストメニューのセットアップ
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    if(Utils.RPGMAKER_NAME === "MV") this.enableAllMaskCut();
    this._globalSettings = Ayatam.QUEST.GlobalSettings;
    this._noNaviMode = this._globalSettings.NoNaviQuestMode;
    this._categorySymbols = ['cat0','cat1','cat2','cat3'];
    this.createHelpWindow();
    this.createListWindow();
    this.createCategoryWindow();
    this.createCategoryLabelWindow();
    this.createDataWindow();
    this.createFilterCommandWindow();
    this.createNavCommandWindow();
    this.createCancelerCommandWindow();
};
//--------------------------------------------------------------------------
// ● ヘルプウィンドウの作成
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.createHelpWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._helpWindow = new Window_HelpForQuest();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._helpWindow = new Window_HelpForQuest(new Rectangle());
    };
    this._helpWindow.setText(this._globalSettings.QuestMenuHelp);
    this.addWindow(this._helpWindow);
};
//--------------------------------------------------------------------------
// ● カテゴリーウィンドウの作成
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.createCategoryWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._categoryWindow = new Window_QuestCategory();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._categoryWindow = new Window_QuestCategory(new Rectangle());
    };
    this._categoryWindow.setCategory('cat0');
    this._categoryWindow.activate();
    this.addWindow(this._categoryWindow);
};
//--------------------------------------------------------------------------
// ● カテゴリーラベルウィンドウの作成
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.createCategoryLabelWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._categoryLabelWindow = new Window_QuestCategoryLabel();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._categoryLabelWindow = new Window_QuestCategoryLabel(new Rectangle());
    };
    this._categoryLabelWindow.setCategory('cat0');
    this.addWindow(this._categoryLabelWindow);
};
//--------------------------------------------------------------------------
// ● フィルターウィンドウの作成
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.createFilterCommandWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._filterWindow = new Window_QuestFilterCategory();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._filterWindow = new Window_QuestFilterCategory(new Rectangle());
    };
    this._filterWindow.setHandler("ok", this.filterOk.bind(this));
    this._filterWindow.setHandler("cancel", this.filterCancel.bind(this));
    this._filterWindow.setFilter('cat0');
    this._filterWindow.deactivate();
    this._filterWindow.hide();
    this.addWindow(this._filterWindow);
};
//--------------------------------------------------------------------------
// ● リストウィンドウの作成
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.createListWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._listWindow = new Window_MenuQuestList();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._listWindow = new Window_MenuQuestList(new Rectangle());
    };
    this._listWindow.setHandler("cancel", this.listCancel.bind(this));
    this._listWindow.setFilter('cat0');
    this._listWindow.refresh();
    this._listWindow.activate();
    this._listWindow.select(0);
    this.addWindow(this._listWindow);
};
//--------------------------------------------------------------------------
// ● 詳細ウィンドウの作成
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.createDataWindow = function() {
    var x = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestDataX;
    var y = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestDataY;
    var width = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestDataWidth;
    var height = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestDataHeight;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._dataWindow = new Window_QuestData(x,y,width,height);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._dataWindow = new Window_QuestData(new Rectangle(x - 3,y - 3,width,height));
    };
    this._dataWindow.opacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestDataOpacity;
    this._dataWindow.backOpacity = Ayatam.QUEST.CustamizeSettings.MenuWindow.QuestDataBackOpacity;
    this._dataWindow.activate();
    this.addWindow(this._dataWindow);
};
//--------------------------------------------------------------------------
// ● ナビコマンドウィンドウの作成
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.createNavCommandWindow = function() {
    var x = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandX;
    var y = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandY;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._naviCommand = new Window_QuestMenuNavCommand(x,y);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._naviCommand = new Window_QuestMenuNavCommand(new Rectangle(x - 3,y - 3));
    };
    this._naviCommand.deactivate();
    this._naviCommand.hide();
    this._naviCommand.setHandler("setNav", this.setNav.bind(this));
    this._naviCommand.setHandler("unsetNav", this.unsetNav.bind(this));
    this._naviCommand.setHandler("cancel", this.navCancel.bind(this));
    this.addWindow(this._naviCommand);
};
//--------------------------------------------------------------------------
// ● 放棄ウィンドウの作成
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.createCancelerCommandWindow = function() {
    var x = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingX;
    var y = Ayatam.QUEST.CustamizeSettings.MenuCommand.CancelingY;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._cancelerWindow = new Window_QuestCancelingCommand(x,y);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._cancelerWindow = new Window_QuestCancelingCommand(new Rectangle(x - 3,y - 3));
    };
    this._cancelerWindow.deactivate();
    this._cancelerWindow.hide();
    this._cancelerWindow.setHandler("ok", this.questCancelOk.bind(this));
    this._cancelerWindow.setHandler("cancel", this.questCancel.bind(this));
    this.addWindow(this._cancelerWindow);
};
//--------------------------------------------------------------------------
// ● リストコマンド 「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.listCancel = function() {
    this.popScene();
};
//--------------------------------------------------------------------------
// ● フィルターコマンド 「開く」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.openFilter = function() {
    if(this._filterWindow.active) return;
    if(this._naviCommand.active) return;
    if(this._cancelerWindow.active) return;
    this._categoryWindow.deactivate();
    this._listWindow.deactivate();
    this._dataWindow.deactivate();
    this._filterWindow.activate();
    this._filterWindow.show();
    this._filterWindow.select(0);
    this._filterWindow.open();
};
//--------------------------------------------------------------------------
// ● フィルターコマンド 「OKコマンド」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.filterOk = function() {
    this._listWindow.setFilter(this._categorySymbols[this._filterWindow._index]);
    this._filterWindow.activate();
};
//--------------------------------------------------------------------------
// ● フィルターコマンド 「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.filterCancel = function() {
    this._filterWindow.deactivate();
    this._filterWindow.hide();
    this._filterWindow.close();
    this._categoryWindow.activate();
    this._listWindow.activate();
    this._listWindow.select(0);
    this._dataWindow.activate();
};
//--------------------------------------------------------------------------
// ● ナビコマンド 「開く」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.openNav = function() {
    if(this._noNaviMode) return;
    if(this._naviCommand.active) return;
    if(this._cancelerWindow.active) return;
    if(this._listWindow.item() === null) return;
    this._listWindow.deactivate();
    this._categoryWindow.deactivate();
    this._dataWindow.deactivate();
    this._naviCommand.setQuest(this._listWindow.item());
    this._naviCommand.refresh();
    this._naviCommand.activate();
    this._naviCommand.show();
    this._naviCommand.select(0);
    this._naviCommand.open();
};
//--------------------------------------------------------------------------
// ● ナビコマンド 「ナビ設定」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.setNav = function() {
    $gameQuest.setNav(this._listWindow.item()._id);
    if($gameTemp.canselNavDraw()) $gameTemp.canselNavDrawFlag(false);
    if($gameTemp.userNavMapKey()) $gameTemp.userNavMapKeyPressed(false);
    this._listWindow.refresh();
    this.navCancel();
};
//--------------------------------------------------------------------------
// ● ナビコマンド 「ナビ解除」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.unsetNav = function() {
    $gameQuest.unSetNav(this._listWindow.item()._id);
    this._listWindow.refresh();
    this.navCancel();
};
//--------------------------------------------------------------------------
// ● ナビコマンド 「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.navCancel = function() {
    this._naviCommand.deactivate();
    this._naviCommand.hide();
    this._naviCommand.close();
    this._categoryWindow.activate();
    this._dataWindow.activate();
    this._listWindow.activate();
};
//--------------------------------------------------------------------------
// ● 放棄コマンド 「開く」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.openQuestCanceler = function() {
    if(this._cancelerWindow.active) return;
    if(this._naviCommand.active) return;
    if(this._filterWindow.active) return;
    if(this._listWindow.item() === null) return;
    this._listWindow.deactivate();
    this._categoryWindow.deactivate();
    this._dataWindow.deactivate();
    this._cancelerWindow.setQuest(this._listWindow.item());
    this._cancelerWindow.refresh();
    this._cancelerWindow.activate();
    this._cancelerWindow.show();
    this._cancelerWindow.select(0);
    this._cancelerWindow.open();
};
//--------------------------------------------------------------------------
// ● 放棄コマンド 「放棄OKコマンド」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.questCancelOk = function() {
    $gameQuest.questCancel(this._listWindow.item()._id);
    this._listWindow.refresh();
    this._listWindow.select(0);
    this.questCancel();
};
//--------------------------------------------------------------------------
// ● 放棄コマンド 「放棄キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.questCancel = function() {
    this._cancelerWindow.deactivate();
    this._cancelerWindow.hide();
    this._cancelerWindow.close();
    this._listWindow.activate();
    this._categoryWindow.activate();
    this._dataWindow.activate();
};
//--------------------------------------------------------------------------
// ● フレームの更新
//--------------------------------------------------------------------------
Scene_QuestMenu.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if(this._listWindow !== undefined) this._listWindow.setCategory(this._categorySymbols[this._categoryWindow._index]);
    if(this._categoryLabelWindow !== undefined) this._categoryLabelWindow.setCategory(this._categorySymbols[this._categoryWindow._index]);
    if(this._dataWindow !== undefined) this._dataWindow.setQuest(this._listWindow.item());
    if(this._globalSettings !== undefined) {
        if(Input.isTriggered(this._globalSettings.QuestMenuFilterKey) || Input.isTriggered(this._globalSettings.QuestMenuPadFilterKey)) this.openFilter();
        if(Input.isTriggered(this._globalSettings.QuestMenuNaviKey) || Input.isTriggered(this._globalSettings.QuestMenuPadNaviKey)) this.openNav();
        if(Input.isTriggered(this._globalSettings.QuestMenuCancelKey) || Input.isTriggered(this._globalSettings.QuestMenuPadCancelKey)) this.openQuestCanceler();
    };
};

//=============================================================================
// Scene_Map - クエストウィンドウの登録
//=============================================================================

var _HighQualityQuestSystem_Scene_Map_prototype_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _HighQualityQuestSystem_Scene_Map_prototype_start.call(this);
    this.createQuestWindows();
    if(Utils.RPGMAKER_NAME === "MV") this.enableAllMaskCut();
};

var _HighQualityQuestSystem_Scene_Map_prototype_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _HighQualityQuestSystem_Scene_Map_prototype_update.call(this);
    this.checkNavigationKey();
    this.checkMouseLeftPress();
};

//--------------------------------------------------------------------------
// ● クエスト関連ウィンドウの作成
//--------------------------------------------------------------------------
Scene_Map.prototype.createQuestWindows = function() {
    this._navigaterLock = false;
    if(Utils.RPGMAKER_NAME === "MZ") this._countClicks = 0;
    this.createQuestNavigation();
    this.createQuestBoardWindow();
    this.createQuestDataWindow();
    this.createQuestMustWindow();
    this.createQuestAssentingCommand();
    this.createQuestReportingCommand();
    this.createNavCommandWindow();
};
//--------------------------------------------------------------------------
// ● クエストボードウィンドウの作成
//--------------------------------------------------------------------------
Scene_Map.prototype.createQuestBoardWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._questBoardWindow = new Window_QuestBoard();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._questBoardWindow = new Window_QuestBoard(new Rectangle());
    };
    this.addWindow(this._questBoardWindow);
    this._questBoardWindow.deactivate();
    this._questBoardWindow.hide();
    if(Utils.RPGMAKER_NAME === "MV") {
        this._questBoardListWindow = new Window_QuestBoardList();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._questBoardListWindow = new Window_QuestBoardList(new Rectangle());
    };
    this._questBoardListWindow.setHandler("ok", this.BoardListOk.bind(this));
    this._questBoardListWindow.setHandler("cancel", this.BoardListCancel.bind(this));
    this.addWindow(this._questBoardListWindow);
    this._questBoardListWindow.deactivate();
    this._questBoardListWindow.hide();
};
//--------------------------------------------------------------------------
// ● クエスト詳細ウィンドウの作成
//--------------------------------------------------------------------------
Scene_Map.prototype.createQuestDataWindow = function() {
    var x = Ayatam.QUEST.CustamizeSettings.DataWindow.DataX;
    var y = Ayatam.QUEST.CustamizeSettings.DataWindow.DataY;
    var width = Ayatam.QUEST.CustamizeSettings.DataWindow.DataWidth;
    var height = Ayatam.QUEST.CustamizeSettings.DataWindow.DataHeight;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._questDataWindow = new Window_QuestData(x,y,width,height);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._questDataWindow = new Window_QuestData(new Rectangle(x,y,width,height));
    };
    this._questDataWindow.setHandler("ok", this.dataOk.bind(this));
    this._questDataWindow.setHandler("cancel", this.dataCancel.bind(this));
    this.addWindow(this._questDataWindow);
    if(Utils.RPGMAKER_NAME === "MZ") this._questDataWindow.openness = 0;
    this._questDataWindow.deactivate();
    this._questDataWindow.hide();
};
//--------------------------------------------------------------------------
// ● クエスト受注条件ウィンドウの作成
//--------------------------------------------------------------------------
Scene_Map.prototype.createQuestMustWindow = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._questMustMainWindow = new Window_CheckQuestMust();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._questMustMainWindow = new Window_CheckQuestMust(new Rectangle());
    };
    this._questMustMainWindow.setHandler("ok", this.checkMustOk.bind(this));
    this._questMustMainWindow.setHandler("cancel", this.checkMustCancel.bind(this));
    this.addWindow(this._questMustMainWindow);
    this._questMustMainWindow.deactivate();
    this._questMustMainWindow.hide();
    if(Utils.RPGMAKER_NAME === "MV") {
        this._questMustSubWindow = new Window_CheckQuestMustSub();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._questMustSubWindow = new Window_CheckQuestMustSub(new Rectangle());
    };
    this.addWindow(this._questMustSubWindow);
    this._questMustSubWindow.deactivate();
    this._questMustSubWindow.hide();
};
//--------------------------------------------------------------------------
// ● クエスト受注ウィンドウの作成
//--------------------------------------------------------------------------
Scene_Map.prototype.createQuestAssentingCommand = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._questAssentingCommand = new Window_QuestAssenting();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._questAssentingCommand = new Window_QuestAssenting(new Rectangle());
    };
    this._questAssentingCommand.setHandler("ok", this.assentingOk.bind(this));
    this._questAssentingCommand.setHandler("cancel", this.assentingCancel.bind(this));
    this.addWindow(this._questAssentingCommand);
    this._questAssentingCommand.deactivate();
    this._questAssentingCommand.hide();
};
//--------------------------------------------------------------------------
// ● クエスト報告ウィンドウの作成
//--------------------------------------------------------------------------
Scene_Map.prototype.createQuestReportingCommand = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._questReportingCommand = new Window_QuestReporting();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._questReportingCommand = new Window_QuestReporting(new Rectangle());
    };
    this._questReportingCommand.setHandler("ok", this.reportingOk.bind(this));
    this._questReportingCommand.setHandler("cancel", this.reportingCancel.bind(this));
    this.addWindow(this._questReportingCommand);
    this._questReportingCommand.deactivate();
    this._questReportingCommand.hide();
};
//--------------------------------------------------------------------------
// ● ナビコマンドウィンドウの作成
//--------------------------------------------------------------------------
Scene_Map.prototype.createNavCommandWindow = function() {
    var x = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandX;
    var y = Ayatam.QUEST.CustamizeSettings.MenuCommand.NavCommandY;
    if(Utils.RPGMAKER_NAME === "MV") {
        this._naviCommand = new Window_QuestMenuNavCommand(x,y);
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._naviCommand = new Window_QuestMenuNavCommand(new Rectangle(x,y));
    };
    this._naviCommand.deactivate();
    this._naviCommand.hide();
    this._naviCommand.setHandler("setNav", this.setNav.bind(this));
    this._naviCommand.setHandler("unsetNav", this.unsetNav.bind(this));
    this._naviCommand.setHandler("cancel", this.navCancel.bind(this));
    this.addWindow(this._naviCommand);
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターウィンドウの作成
//--------------------------------------------------------------------------
Scene_Map.prototype.createQuestNavigation = function() {
    if(Utils.RPGMAKER_NAME === "MV") {
        this._questNavWindow = new Window_QuestMapNavigation();
    }else if(Utils.RPGMAKER_NAME === "MZ"){
        this._questNavWindow = new Window_QuestMapNavigation(new Rectangle());
    };
    this.addWindow(this._questNavWindow);
};
//--------------------------------------------------------------------------
// ● クエスト状況中？
//--------------------------------------------------------------------------
Scene_Map.prototype.questBusy = function() {
    if(this._questReportingCommand.active || this._questAssentingCommand.active || this._naviCommand.active || this._questDataWindow.active || this._questBoardListWindow.active || this._questMustMainWindow.active) {
        return true;
    }else{
        return false;
    };
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターウィンドウの更新
//--------------------------------------------------------------------------
Scene_Map.prototype.QuestNavNeedRefresh = function() {
    this._questNavWindow.needRefresh();
};
//--------------------------------------------------------------------------
// ● クエストマウス入力の取得
//--------------------------------------------------------------------------
if(Utils.RPGMAKER_NAME === "MV") {
    Scene_Map.prototype.checkMouseLeftPress = function() {
        if(TouchInput.isTriggered()) {
            if(this._questDataWindow.active) {
                if(this._questDataWindow.isReporting()) {
                    if(!this._questReportingCommand.active) {
                        this._questReportingCommand.setQuest(this._questDataWindow.questData());
                        this._questReportingCommand.activate();
                        this._questReportingCommand.refresh();
                        this._questReportingCommand.select(0);
                        this._questReportingCommand.show();
                    };
                }else{
                    if(!this._questAssentingCommand.active) {
                        this._questAssentingCommand.setQuest(this._questDataWindow.questData());
                        this._questAssentingCommand.setBoard(this._questDataWindow.fromBoard());
                        this._questAssentingCommand.activate();
                        this._questAssentingCommand.refresh();
                        this._questAssentingCommand.select(0);
                        this._questAssentingCommand.show();
                    };
                };
            }else if(this._questMustMainWindow.active) {
                this.checkMustOk();
            };
        };
    };
}else if(Utils.RPGMAKER_NAME === "MZ"){
    Scene_Map.prototype.checkMouseLeftPress = function() {
        if(TouchInput.isTriggered()) {
            if(this._countClicks === 1) {
                if(this._questDataWindow.active) {
                    if(this._questDataWindow.isReporting()) {
                        if(!this._questReportingCommand.active) {
                            this._questReportingCommand.setQuest(this._questDataWindow.questData());
                            this._questReportingCommand.activate();
                            this._questReportingCommand.refresh();
                            this._questReportingCommand.select(0);
                            this._questReportingCommand.show();
                        };
                    }else{
                        if(!this._questAssentingCommand.active) {
                            this._questAssentingCommand.setQuest(this._questDataWindow.questData());
                            this._questAssentingCommand.setBoard(this._questDataWindow.fromBoard());
                            this._questAssentingCommand.activate();
                            this._questAssentingCommand.refresh();
                            this._questAssentingCommand.select(0);
                            this._questAssentingCommand.show();
                        };
                    };
                }else if(this._questMustMainWindow.active) {
                    this.checkMustOk();
                };
            }else{
                //mz用のクリック補正
                if(this._questDataWindow.active) {
                    if(this._countClicks === 0) {
                        this._countClicks = 1;
                    };
                };
            };
        };
    };
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターの状態
//--------------------------------------------------------------------------
Scene_Map.prototype.checkNavigationKey = function() {
    if(Ayatam.QUEST.GlobalSettings.NoNaviQuestMode) return;
    if(Ayatam.QUEST.GlobalSettings.QuestNaviMapSceneKey === "") return;
    if(!Ayatam.QUEST.GlobalSettings.QuestNaviMapSceneKey.UseMapKey) return;
    if(!$gameParty.questInNavi()) return;
    if(this.questBusy()) return;
    if(this._navigaterLock) return;
    if(Input.isTriggered(Ayatam.QUEST.GlobalSettings.QuestNaviMapSceneKey.MapSceneKey) || Input.isTriggered(Ayatam.QUEST.GlobalSettings.QuestNaviMapSceneKey.MapScenePadKey)) this.pressNavigationKey();
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターのマップシーンキー入力
//--------------------------------------------------------------------------
Scene_Map.prototype.pressNavigationKey = function() {
    if(!this._questNavWindow.visible){
        this.userShowQuestNav();
    }else{
        this.userHideQuestNav();
    };
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターの表示
//--------------------------------------------------------------------------
Scene_Map.prototype.showQuestNav = function(key = false) {
    if(Ayatam.QUEST.GlobalSettings.NoNaviQuestMode) return;
    if(!$gameParty.questInNavi()) return;
    if(!key) this._navigaterLock = false;
    if($gameTemp.userNavMapKey()) return;
    $gameTemp.canselNavDrawFlag(false);
    this._questNavWindow.show();
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターの非表示
//--------------------------------------------------------------------------
Scene_Map.prototype.hideQuestNav = function(key = false) {
    if(Ayatam.QUEST.GlobalSettings.NoNaviQuestMode) return;
    if(!$gameParty.questInNavi()) return;
    if(!key) this._navigaterLock = true;
    $gameTemp.canselNavDrawFlag(true);
    if($gameTemp.userNavMapKey()) return;
    this._questNavWindow.hide();
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターの表示 ユーザー指定
//--------------------------------------------------------------------------
Scene_Map.prototype.userShowQuestNav = function() {
    if(Ayatam.QUEST.GlobalSettings.NoNaviQuestMode) return;
    if(!$gameParty.questInNavi()) return;
    $gameTemp.canselNavDrawFlag(false);
    $gameTemp.userNavMapKeyPressed(false);
    this._questNavWindow.show();
};
//--------------------------------------------------------------------------
// ● クエストナビゲーターの非表示 ユーザー指定
//--------------------------------------------------------------------------
Scene_Map.prototype.userHideQuestNav = function() {
    if(Ayatam.QUEST.GlobalSettings.NoNaviQuestMode) return;
    if(!$gameParty.questInNavi()) return;
    $gameTemp.canselNavDrawFlag(true);
    $gameTemp.userNavMapKeyPressed(true);
    this._questNavWindow.hide();
};
//--------------------------------------------------------------------------
// ● クエストボード「表示」
//--------------------------------------------------------------------------
Scene_Map.prototype.questBoard = function(boardId,boardTitle = null,listMode,showMode) {
    this.hideQuestNav();
    this._questBoardWindow.setShowQuest(showMode);
    this._questBoardWindow.setBoardTitle(boardTitle);
    this._questBoardWindow.show();
    this._questBoardListWindow.setBoardId(boardId);
    this._questBoardListWindow.setListMode(listMode);
    this._questBoardListWindow.refresh();
    this._questBoardListWindow.select(0);
    this._questBoardListWindow.activate();
    this._questBoardListWindow.show();
};
//--------------------------------------------------------------------------
// ● クエスト受注条件画面「表示」
//--------------------------------------------------------------------------
Scene_Map.prototype.showCheckQuest = function(questId,showMode,fromBoard = false) {
    if(!fromBoard) this.hideQuestNav();
    this._questMustMainWindow.setQuest($gameQuest.findQuest(questId));
    this._questMustMainWindow.setShowQuest(showMode);
    this._questMustMainWindow.setBoard(fromBoard);
    this._questMustMainWindow.activate();
    this._questMustMainWindow.show();
    this._questMustSubWindow.setQuest($gameQuest.findQuest(questId));
    this._questMustSubWindow.setBoard(fromBoard);
    this._questMustSubWindow.show();
    if(Utils.RPGMAKER_NAME === "MZ") this._countClicks = 1;
};
//--------------------------------------------------------------------------
// ● クエスト受注詳細画面「表示」
//--------------------------------------------------------------------------
Scene_Map.prototype.showQuest = function(questId,fromBoard = false) {
    if(!fromBoard) this.hideQuestNav();
    this._questDataWindow.setQuest($gameQuest.findQuest(questId));
    this._questDataWindow.setBoard(fromBoard);
    this._questDataWindow.setReport(false);
    this._questDataWindow.activate();
    this._questDataWindow.show();
    if(Utils.RPGMAKER_NAME === "MZ") this._questDataWindow.openness = 255;
};
//--------------------------------------------------------------------------
// ● クエスト報告詳細画面「表示」
//--------------------------------------------------------------------------
Scene_Map.prototype.reportQuest = function(questId,fromBoard = false) {
    if(!fromBoard) this.hideQuestNav();
    this._questDataWindow.setQuest($gameQuest.findQuest(questId));
    this._questDataWindow.setBoard(fromBoard);
    this._questDataWindow.setReport(true);
    this._questDataWindow.activate();
    this._questDataWindow.show();
    if(Utils.RPGMAKER_NAME === "MZ") this._questDataWindow.openness = 255;
};
//--------------------------------------------------------------------------
// ● クエストボード画面「OKコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.BoardListOk = function() {
    if(this._questBoardWindow.isShowQuest()) {
        if(this._questBoardListWindow.item() !== null) {
            this.showCheckQuest(this._questBoardListWindow.item()._id,true,true);
            this._questBoardListWindow.deactivate();
        }else{
            this._questBoardListWindow.activate();
        };
        $gameQuest.setShowCheckQuestChoice(true);
    }else{
        if(this._questBoardListWindow.item() !== null) {
            this.showQuest(this._questBoardListWindow.item()._id,true);
            this._questBoardListWindow.deactivate();
        }else{
            this._questBoardListWindow.activate();
        };
        $gameQuest.setShowCheckQuestChoice(true);
    };
};
//--------------------------------------------------------------------------
// ● クエストボード画面「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.BoardListCancel = function() {
    $gameQuest.setShowCheckQuestChoice(false);
    this._questBoardWindow.hide();
    this._questBoardListWindow.deactivate();
    this._questBoardListWindow.hide();
    this.showQuestNav();
    $gameQuest.setFiberYield(false);
};
//--------------------------------------------------------------------------
// ● クエスト受注条件画面「OKコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.checkMustOk = function() {
    if($gameQuest.canAssent(this._questMustMainWindow._questId)) {
        if(this._questMustMainWindow.isShowQuest()) {
            $gameQuest.setShowCheckQuestChoice(true);
            this._questMustMainWindow.deactivate();
            this._questMustMainWindow.hide();
            this._questMustSubWindow.hide();
            this.showQuest(this._questMustMainWindow._questId,this._questMustMainWindow.fromBoard());
            this._questMustMainWindow.setQuest(null);
            this._questMustSubWindow.setQuest(null);
        }else{
            this.checkMustCancel(true);
        };
    }else{
        $gameQuest.setShowCheckQuestChoice(false);
        this._questMustMainWindow.activate();
    };
};
//--------------------------------------------------------------------------
// ● クエスト受注条件画面「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.checkMustCancel = function(choice = false) {
    $gameQuest.setShowCheckQuestChoice(choice);
    this._questMustMainWindow.deactivate();
    this._questMustMainWindow.hide();
    this._questMustMainWindow.setQuest(null);
    this._questMustSubWindow.hide();
    this._questMustSubWindow.setQuest(null);
    if(!this._questMustMainWindow.fromBoard()) {
        this.showQuestNav();
        $gameQuest.setFiberYield(false);
    }else{
        this._questBoardListWindow.activate();
    };
};
//--------------------------------------------------------------------------
// ● クエスト詳細画面「OKコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.dataOk = function() {
    this._questDataWindow.deactivate();
    if(this._questDataWindow.isReporting()) {
        this._questReportingCommand.setQuest(this._questDataWindow.questData());
        this._questReportingCommand.activate();
        this._questReportingCommand.refresh();
        this._questReportingCommand.select(0);
        this._questReportingCommand.show();
    }else{
        this._questAssentingCommand.setQuest(this._questDataWindow.questData());
        this._questAssentingCommand.setBoard(this._questDataWindow.fromBoard());
        this._questAssentingCommand.activate();
        this._questAssentingCommand.refresh();
        this._questAssentingCommand.select(0);
        this._questAssentingCommand.show();
    };
};
//--------------------------------------------------------------------------
// ● クエスト詳細画面「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.dataCancel = function() {
    if(this._questAssentingCommand.active || this._questReportingCommand.active) return;
    this._questDataWindow.deactivate();
    this._questDataWindow.hide();
    this._questDataWindow.setQuest(null);
    if(!this._questDataWindow.fromBoard()) {
        this.showQuestNav();
        $gameQuest.setFiberYield(false);
    }else{
        this._questBoardListWindow.activate();
    };
    if(Utils.RPGMAKER_NAME === "MZ" && this._countClicks === 1) this._countClicks = 0;
};
//--------------------------------------------------------------------------
// ● クエスト受注コマンド「OKコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.assentingOk = function() {
    $gameQuest.questAssent(this._questAssentingCommand._questId);
    this._questAssentingCommand.deactivate();
    this._questAssentingCommand.hide();
    this._questBoardListWindow.refresh();
    if(!Ayatam.QUEST.GlobalSettings.NoNaviQuestMode) {
        this._questDataWindow.deactivate();
        this._questDataWindow.hide();
        this._questDataWindow.setQuest(null);
        this.OpenNavi(this._questAssentingCommand.questData(),this._questAssentingCommand.fromBoard());
        this._questAssentingCommand.setQuest(null);
    }else{
        this._questAssentingCommand.setQuest(null);
        this._questBoardListWindow.select(0);
        this.dataCancel();
    };
};
//--------------------------------------------------------------------------
// ● クエスト受注コマンド「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.assentingCancel = function() {
    this._questAssentingCommand.deactivate();
    this._questAssentingCommand.hide();
    this._questAssentingCommand.setQuest(null);
    this._questDataWindow.activate();
};
//--------------------------------------------------------------------------
// ● クエスト報告コマンド「OKコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.reportingOk = function() {
    $gameQuest.questReport(this._questReportingCommand._questId);
    this._questReportingCommand.deactivate();
    this._questReportingCommand.hide();
    this._questReportingCommand.setQuest(null);
    this.dataCancel();
    this.showQuestNav();
};
//--------------------------------------------------------------------------
// ● クエスト報告コマンド「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.reportingCancel = function() {
    this._questReportingCommand.deactivate();
    this._questReportingCommand.hide();
    this._questReportingCommand.setQuest(null);
    this._questDataWindow.activate();
};
//--------------------------------------------------------------------------
// ● ナビコマンド 「開く」
//--------------------------------------------------------------------------
Scene_Map.prototype.OpenNavi = function(quest,fromBoard = false) {
    this._naviCommand.setQuest(quest);
    this._naviCommand.setBoard(fromBoard);
    this._naviCommand.refresh();
    this._naviCommand.activate();
    this._naviCommand.show();
    this._naviCommand.select(0);
    this._naviCommand.open();
};
//--------------------------------------------------------------------------
// ● ナビコマンド 「ナビ設定」
//--------------------------------------------------------------------------
Scene_Map.prototype.setNav = function() {
    $gameQuest.setNav(this._naviCommand._questId);
    if($gameTemp.canselNavDraw()) $gameTemp.canselNavDrawFlag(false);
    if($gameTemp.userNavMapKey()) $gameTemp.userNavMapKeyPressed(false);
    this.navCancel();
};
//--------------------------------------------------------------------------
// ● ナビコマンド 「ナビ解除」
//--------------------------------------------------------------------------
Scene_Map.prototype.unsetNav = function() {
    $gameQuest.unSetNav(this._naviCommand._questId);
    this.navCancel();
};
//--------------------------------------------------------------------------
// ● ナビコマンド 「キャンセルコマンド」
//--------------------------------------------------------------------------
Scene_Map.prototype.navCancel = function() {
    this._naviCommand.deactivate();
    this._naviCommand.hide();
    this._naviCommand.close();
    if(this._naviCommand.fromBoard()) {
        this._questBoardListWindow.activate();
        this._questBoardListWindow.select(0);
    }else{
        this.showQuestNav();
        $gameQuest.setFiberYield(false);
    };
};

//=============================================================================
// プラグイン終了 - End of file
//=============================================================================