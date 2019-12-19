import React, { Component } from "react";
import Loading from "react-loading-bar";
import "react-loading-bar/dist/index.css";
// Set Up The Initial Context
const LoadingContext = React.createContext();
// Create an exportable consumer that can be injected into components
export const LoadingConsumer = LoadingContext.Consumer;
// Create the provider using a traditional React.Component class
class LoadingProvider extends Component {
  state = {
    loading: false
  };

  setLoading = (loading) => {
    this.setState({ loading });
  };

  render() {
    return (
      <div>
        <Loading
          show={this.state.loading}
          color="lightseagreen"
          showSpinner={false}
        />
        <LoadingContext.Provider
          value={{
            setLoadingValue: this.setLoading,
            loading: this.state.loading
          }}
        >
          {this.props.children}
        </LoadingContext.Provider>
      </div>
    );
  }
}
export default LoadingProvider;

export function withConsumer(Component) {
  return class extends React.Component {
    render() {
      return (
        <LoadingConsumer>
          {(value) => {
            /* console.log(value); */

            return <Component {...value} {...this.props} />;
          }}
        </LoadingConsumer>
      );
    }
  };
}
