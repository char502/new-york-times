import React, { Component } from "react";
import styled from "styled-components/macro";
import "react-loading-bar/dist/index.css";
import AlertMessage from "./AlertMessage";
// Set Up The Initial Context
const NotificationContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const NotificationConsumer = NotificationContext.Consumer;
// Create the provider using a traditional React.Component class

const AlertContainer = styled.div`
  padding: 10px;
  width: 300px;
  height: auto;
  position: fixed;
  top: 0;
  right: 0;
  background: ${(props) => (props.color ? props.color : "red")};
  z-index: 999;
  color: white;
`;

class NotificationProvider extends Component {
  state = {
    showNotification: false,
    color: "",
    message: ""
  };

  handleItemAction = (config) => {
    this.setState({
      showNotification: true,
      color: config.color ? "rgba(255, 0, 0, 0.8)" : "rgba(0, 128, 0, 0.8)",
      message: config.alertMessage ? (
        <AlertMessage details={config} messageText={config.textWhenTrue} />
      ) : (
        <AlertMessage details={config} messageText={config.textWhenFalse} />
      )
    });
    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 3000);
  };

  render() {
    return (
      <div>
        {this.state.showNotification && (
          <AlertContainer color={this.state.color}>
            {this.state.message}
          </AlertContainer>
        )}
        <NotificationContext.Provider
          value={{
            setNotificationValue: this.handleItemAction, //the method
            showNotification: this.state.showNotification // the state
          }}
        >
          {this.props.children}
        </NotificationContext.Provider>
      </div>
    );
  }
}
export default NotificationProvider;

export function withNotificationConsumer(Component) {
  return class extends React.Component {
    render() {
      return (
        <NotificationConsumer>
          {(values) => {
            return <Component {...values} {...this.props} />;
          }}
        </NotificationConsumer>
      );
    }
  };
}
