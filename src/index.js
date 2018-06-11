

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import embed from 'vega-embed';
import { Container, Row, Col, Table } from 'reactstrap';

import './index.scss';


class App extends Component {

  render() {
    return (
      <Container>

        <Row>
          <Col>

            <h1 className="display-4">Top 2,000 authors (T-SNE)</h1>
            <p>Here's a "map" of the 2,000 most frequently-assigned authors, laid out so that texts that get assigned in similar courses are close together.</p>

            <div id="vega1"></div>
            <p className="caption">Scroll to zoom.</p>

            <p>This is the end-result of a series of "dimensionality reduction" steps that make it possible to plot the data in two dimensions. Originally, everything is represented as a huge matrix that records which syllabi each book is assigned on. For example, we might have:</p>

            <Table size="sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Syllabus 1</th>
                  <th>Syllabus 2</th>
                  <th>Syllabus 3</th>
                  <th>...</th>
                  <th>Syllabus 1M</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Book 1</th>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>...</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>Book 2</th>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>...</td>
                  <td>1</td>
                </tr>
                <tr>
                  <th>Book 3</th>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>...</td>
                  <td>0</td>
                </tr>
              </tbody>
            </Table>

            <p>Where a "1" means that the book was assigned on the syllabus, and "0" if not. This data is hard to work with, though, since there are so many columns (one for each syllabus). And it's also really "sparse" - most of the values are 0, since most books will only show up on a handful of syllabi. This makes it hard to reason about how different books relate. For example, books A and B might never show up together on the same syllabus. But, they might both get assigned frequently with book C, which forms an implicit connection between A and B. We want to be able to discover these types of connections.</p>

            <p>One way to do that is to use a technique called "singular value decomposition" to generate a kind of "summary" vector for each book, which can capture these kinds of similarities. This way, instead of representing each book as a huge, 1M-dimension vector mostly filled with zeros, we represent it as a smaller vector (here, 10 dimensions) that will assign the book to a position in the 10-dimensional space that is geometrically close to other books that are assigned in similar types of courses. Then, we can hand these smaller vectors to an algorithm like T-SNE, which further compresses them into just 2 dimensions, which can be visualized.</p>

          </Col>
        </Row>

        <Row>
          <Col>
            <h1 className="display-4">Top 2,000 authors (UMAP)</h1>
            <p>Here's another version of the same thing, but this time using an algorithm called UMAP instead of T-SNE to do the finale dimensionality reduction, which gives a very different type of layout. Though, the groupings are generally quite similar - eg, that line of texts at the bottom right here (Faulkner, Paine, Jefferson, Thoreau) is basically the same as the cluster at the top left in the first plot. It's interesting here that (modern) literature separates so cleanly from the rest of the texts, whereas classics and philosophy are attached to the larger social sciences / sciences cluster. Though, not too much can be read into the specific organization of these plots, since they always somewhat distort the raw data in one way or another.</p>
            <div id="vega2"></div>
          </Col>
        </Row>

        <Row>
          <Col>
            <h1 className="display-4">~5k random syllabi (T-SNE)</h1>
            <p>Here's another view of the same data, but reversed - instead of clustering books by which courses they are assigned in, here we're clustering courses by which books they assign. Each dot represents a syllabus, and the colors correspond to the "field" classifications from the first version of the OSP data. (Which are far from perfect - this is more accurate in the second version.) Like before, we get a kind of disciplinary atlas - English (green) on the right, Economics (red) on the left, etc.</p>
            <div id="vega3"></div>
            <p className="caption">Hover over the dots to see the first 5 texts assigned on each syllabus.</p>
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

    embed('#vega2', 'data/authors-umap-pruned.json', {
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
