import React, { Component } from "react";
import "react-loading-bar/dist/index.css";
// Set Up The Initial Context
const NotificationContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const NotificationConsumer = NotificationContext.Consumer;
// Create the provider using a traditional React.Component class
class NotificationProvider extends Component {
  state = {
    showNotification: false
  };

  handleItemAction = () => {
    this.setState({ showNotification: true });
    // setTimeout(() => {
    //   this.setState({ showNotification: false });
    // }, 2000);
  };

  render() {
    return (
      <div>
        {this.showNotification && (
          <div
            style={{
              width: 300,
              height: 75,
              position: "fixed",
              top: 0,
              left: 0,
              background: "red",
              zIndex: 999
            }}
          >
            Notification Message
          </div>
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
            /* console.log(values); */

            return <Component {...values} {...this.props} />;
          }}
        </NotificationConsumer>
      );
    }
  };
}
