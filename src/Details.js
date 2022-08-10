import { Component } from "react";
// eslint-disable-next-line import/namespace, import/named
import { withRouter } from "react-router-dom";
import Caraousel from "./Caraousel";
import ErrorBoundary from "./ErrorBoundary";

class Details extends Component {
  state = { loading: true, name: "", animal: "" };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  render() {
    const { animal, breed, city, state, description, name, images } =
      this.state;

    // throw new Error("This is an error");

    return (
      <div className="details">
        <Caraousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city} - ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
