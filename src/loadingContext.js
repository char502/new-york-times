import React, { Component } from "react";
import Loading from "react-loading-bar";
// Set Up The Initial Context
const LoadingContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const LoadingConsumer = LoadingContext.Consumer;
// Create the provider using a traditional React.Component class
class LoadingProvider extends Component {
  state = {
    loading: false
  };

  setLoading = loading => {
    this.setState({ loading });
  };

  render() {
    return (
      <div>
        <Loading show={this.state.loading} color="red" />
        <LoadingContext.Provider value={{ setLoadingValue: this.setLoading }}>
          {this.props.children}
        </LoadingContext.Provider>
      </div>
    );
  }
}
export default LoadingProvider;
