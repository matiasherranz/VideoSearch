import _ from 'lodash';

import React, { Component } from 'react';
import ReactDom from 'react-dom';

import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar.js';
import VideoList from './components/video_list.js';
import VideoDetail from './components/video_detail.js';

const API_KEY = 'AIzaSyAgPh4VeV8lzRsNcABgHuIsaKNheFmNaC0';

// Create a new component. This componen should
// produce some HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('trail running');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      // This gets resolved as this.setState( { videos: videos })
      // this.setState( { videos })
    });
  }

  render() {
    // Debounced version of the funciton that can only be
    // called once in 300 miliseconds
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={ this.state.selectedVideo } />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={ this.state.videos }/>
      </div>
    )
  };
}

// Take the component's generated HTML into the DOM
ReactDom.render(
  <App/>, document.querySelector('.container')
);
