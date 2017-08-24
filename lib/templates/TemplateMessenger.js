"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var react_router_redux_1 = require("react-router-redux");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var plugin_1 = require("../actions/plugin");
var setting_1 = require("../actions/setting");
var user_1 = require("../actions/user");
var stores_1 = require("../stores");
var _1 = require("../containers/");
var message_1 = require("../plugins/message");
var TemplateMessenger = (function (_super) {
    __extends(TemplateMessenger, _super);
    function TemplateMessenger(props, context) {
        var _this = _super.call(this, props, context) || this;
        var scMessagePlugins = _this.props.route && _this.props.route.scMessagePlugins ? _this.props.route.scMessagePlugins : [
            new message_1.PluginMessageText(),
            new message_1.PluginMessageImage(),
        ];
        stores_1.store.dispatch(plugin_1.setPluginMessageActionCreator(scMessagePlugins));
        var scCustomMessagePlugins = _this.props.route && _this.props.route.scMessagePlugins ? _this.props.route.scMessagePlugins : [
            new message_1.PluginMessageText(),
            new message_1.PluginMessageImage(),
        ];
        stores_1.store.dispatch(plugin_1.setCustomPluginMessageActionCreator(scCustomMessagePlugins));
        stores_1.store.dispatch(setting_1.setRoomListTitleActionCreator(props.route ? props.route.roomListTitle : props.roomListTitle));
        stores_1.store.dispatch(setting_1.setRoomListTabbarActionCreator(props.route ? props.route.tabbar : props.tabbar));
        stores_1.store.dispatch(setting_1.setNoRoomListTextActionCreator(props.route ? props.route.noRoomListText : props.noRoomListText));
        stores_1.store.dispatch(setting_1.setNoRoomListImageActionCreator(props.route ? props.route.noRoomListImage : props.noRoomListImage));
        stores_1.store.dispatch(setting_1.setNoMessageTextActionCreator(props.route ? props.route.noMessageText : props.noMessageText));
        stores_1.store.dispatch(setting_1.setNoMessageImageActionCreator(props.route ? props.route.noMessageImage : props.noMessageImage));
        stores_1.store.dispatch(setting_1.setInputMessagePlaceholderTextActionCreator(props.route ? props.route.inputMessagePlaceholderText : props.inputMessagePlaceholderText));
        stores_1.store.dispatch(setting_1.setRoomSettingTitleActionCreator(props.route ? props.route.roomSettingTitle : props.roomSettingTitle));
        stores_1.store.dispatch(setting_1.setRoomMembersTitleActionCreator(props.route ? props.route.roomMembersTitle : props.roomMembersTitle));
        stores_1.store.dispatch(setting_1.setNoAvatarImagesActionCreator(props.route ? props.route.noAvatarImages : props.noAvatarImages));
        stores_1.store.dispatch(setting_1.setSelectContactTitleActionCreator(props.route ? props.route.selectContactTitle : props.selectContactTitle));
        stores_1.store.dispatch(setting_1.setNoContactListTextActionCreator(props.route ? props.route.noContactListText : props.noContactListText));
        stores_1.store.dispatch(setting_1.setNoContactListImageActionCreator(props.route ? props.route.noContactListImage : props.noContactListImage));
        stores_1.store.dispatch(setting_1.setRoomListRoutePathActionCreator(props.route ? props.route.roomListRoutePath : props.roomListRoutePath));
        stores_1.store.dispatch(setting_1.setMessageRoutePathActionCreator(props.route ? props.route.messageRoutePath : props.messageRoutePath));
        stores_1.store.dispatch(setting_1.setRoomSettingRoutePathActionCreator(props.route ? props.route.roomSettingRoutePath : props.roomSettingRoutePath));
        stores_1.store.dispatch(setting_1.setSelectContactRoutePathActionCreator(props.route ? props.route.selectContactRoutePath : props.selectContactRoutePath));
        var rtmEndpoint;
        var rtmProtocol = props.route ? props.route.rtmProtocol : props.rtmProtocol;
        var rtmHost = props.route ? props.route.rtmHost : props.rtmHost;
        if (rtmHost === '') {
            rtmHost = location.host;
        }
        var rtmPath = props.route ? props.route.rtmPath : props.rtmPath;
        rtmEndpoint = rtmProtocol + '://' + rtmHost + rtmPath;
        stores_1.store.dispatch(user_1.setUserAuthParamsActionCreator(props.route ? props.route.apiKey : props.apiKey, props.route ? props.route.apiEndpoint : props.apiEndpoint, rtmEndpoint, props.route ? props.route.userId : props.userId, props.route ? props.route.userAccessToken : props.userAccessToken));
        return _this;
    }
    TemplateMessenger.prototype.render = function () {
        return (React.createElement(react_redux_1.Provider, { store: stores_1.store },
            React.createElement(react_router_redux_1.ConnectedRouter, { history: stores_1.routerHistory },
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: stores_1.store.getState().setting.roomListRoutePath, component: _1.ContainerRoomListPage }),
                    React.createElement(react_router_dom_1.Route, { path: stores_1.store.getState().setting.messageRoutePath + '/:messageId', component: _1.ContainerMessagePage }),
                    React.createElement(react_router_dom_1.Route, { path: stores_1.store.getState().setting.roomSettingRoutePath + '/:roomId', component: _1.ContainerRoomSettingPage }),
                    React.createElement(react_router_dom_1.Route, { path: stores_1.store.getState().setting.selectContactRoutePath, component: _1.ContainerSelectContactPage })))));
    };
    return TemplateMessenger;
}(React.Component));
exports.TemplateMessenger = TemplateMessenger;
exports.renderTemplateMessenger = function (params) {
    ReactDom.render(React.createElement(TemplateMessenger, { roomListTitle: params.roomListTitle ? params.roomListTitle : 'Room List', noRoomListText: params.noRoomListText ? params.noRoomListText : 'No rooms.', noRoomListImage: params.noRoomListImage ? params.noRoomListImage : '', noMessageText: params.noMessageText ? params.noMessageText : 'No messages.', noMessageImage: params.noMessageImage ? params.noMessageImage : '', inputMessagePlaceholderText: params.inputMessagePlaceholderText ? params.inputMessagePlaceholderText : 'Input text...', roomSettingTitle: params.roomSettingTitle ? params.roomSettingTitle : 'Room Settings', roomMembersTitle: params.roomMembersTitle ? params.roomMembersTitle : 'Members', noAvatarImages: params.noAvatarImages ? params.noAvatarImages : ['https://unpkg.com/react-swagchat/dist/img/normal.png', 'https://unpkg.com/react-swagchat/dist/img/sad.png', 'https://unpkg.com/react-swagchat/dist/img/smile.png'], selectContactTitle: params.selectContactTitle ? params.selectContactTitle : 'Select Contacts', noContactListText: params.noContactListText ? params.noContactListText : 'No Contacts', noContactListImage: params.noContactListImage ? params.noContactListImage : '', apiKey: params.apiKey ? params.apiKey : '', apiEndpoint: params.apiEndpoint ? params.apiEndpoint : '', rtmProtocol: params.rtmProtocol ? params.rtmProtocol : 'ws', rtmHost: params.rtmHost ? params.rtmHost : '', rtmPath: params.rtmPath ? params.rtmPath : '', userId: params.userId ? params.userId : '', userAccessToken: params.userAccessToken ? params.userAccessToken : '', roomListRoutePath: params.roomListRoutePath ? params.roomListRoutePath : '/', messageRoutePath: params.messageRoutePath ? params.messageRoutePath : '/messages', roomSettingRoutePath: params.roomSettingRoutePath ? params.roomSettingRoutePath : '/roomSetting', selectContactRoutePath: params.selectContactRoutePath ? params.selectContactRoutePath : '/selectContact' }), document.getElementById(params.renderDomId ? params.renderDomId : 'swagchat'));
};
//# sourceMappingURL=TemplateMessenger.js.map