

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import embed from 'vega-embed';
import { Container, Row, Col } from 'reactstrap';

import './index.scss';


const spec = 'https://gist.githubusercontent.com/davidmcclure/741093e6c706270143403a6db896bc1b/raw/4e959d6ff101120434d5c5fd4a3485f3f9f49f2a/authors.json';


class App extends Component {

  render() {
    return (
      <Container>

        <Row>
          <Col>
            <h1 className="display-4">Top 2,000 authors (T-SNE)</h1>
            <p>A "map" of the 2,000 most frequently-assigned authors (broken out by text), laid out so that texts that get assigned in similar combinations of courses are close together. Under the hood, this uses singular value decomposition (SVD) to generate 10-dimensional vectors for each text. Then, these high-dimensional embeddings are mapped down to a 2-dimensional space by an algorithm called T-SNE, which tries to preserve the high-level structure of the original data. There are lots of different way that this low-dimensional approximation can be generated, and they can give really different results. But, generally, if two texts are close together in the plot, then they tend to appear in the same types of courses.</p>
            <div id="vega1"></div>
          </Col>
        </Row>

        <Row>
          <Col>
            <h1 className="display-4">Top 2,000 authors (UMAP)</h1>
            <p>Same as above, but this time using an algorithm called UMAP instead of T-SNE to do the dimensionality reduction, which gives a really different result. UMAP appears to pull out a more "global" representation of the data, basically a big linear axis where the bottom is the humanities (literature, philosophy) and the top is the sciences (computer science, business, chemistry). And, that one cluster that gets shot way off to the left! Which is likely some kind of quirk in the data, maybe cluster of syllabi from one particular department.</p>
            <div id="vega2"></div>
          </Col>
        </Row>

        <Row>
          <Col>
            <h1 className="display-4">~5k random syllabi</h1>
            <div id="vega3"></div>
          </Col>
        </Row>

      </Container>
    );
  }

  componentDidMount() {

    embed('#vega1', 'data/authors-tsne.json', {
      defaultStyle: true,
      width: 1000,
      height: 800,
    });

    embed('#vega2', 'data/authors-umap.json', {
      defaultStyle: true,
      width: 1000,
      height: 800,
    });

    embed('#vega3', 'data/docs-tsne.json', {
      defaultStyle: true,
      width: 1000,
      height: 800,
    });

  }

}


ReactDOM.render(<App />, document.getElementById('root'));
