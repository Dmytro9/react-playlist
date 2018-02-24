import React, { Component } from "react";
import "./App.css";

let mockData = {
  user: {
    name: "Dima",
    playlist: [
      {
        name: "My favorites 1",
        songs: [
          { name: "one", duration: 123 },
          { name: "two", duration: 123 },
          { name: "three", duration: 123 }
        ]
      },
      {
        name: "My favorites 2",
        songs: [
          { name: "one", duration: 456 },
          { name: "two", duration: 465 },
          { name: "three", duration: 456 }
        ]
      },
      {
        name: "My favorites 3",
        songs: [
          { name: "one", duration: 789 },
          { name: "two", duration: 789 },
          { name: "three", duration: 789 }
        ]
      },
      {
        name: "My favorites 4",
        songs: [
          { name: "one", duration: 159 },
          { name: "two", duration: 159 },
          { name: "three", duration: 753 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return [...songs, ...eachPlaylist.songs];
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);

    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2>{Math.round(totalDuration / 60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          onKeyUp={event => this.props.onTextChange(event.target.value)}
        />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{ width: "25%", display: "inline-block" }}>
        <img />
        <h3>{this.props.playlist.name}</h3>
        <ul>{this.props.playlist.songs.map(song => <li>{song.name}</li>)}</ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: mockData
      });
    }, 1000);
    setTimeout(() => {
      this.setState({
        filterString: ""
      });
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1 className="App-title">
              {this.state.serverData.user.name}'s Playlist
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlist} />
            <HoursCounter playlists={this.state.serverData.user.playlist} />
            <Filter
              onTextChange={text => this.setState({ filterString: text })}
            />
            {this.state.serverData.user.playlist
              .filter(playlist =>
                playlist.name
                  .toLowerCase()
                  .includes(this.state.filterString.toLowerCase())
              )
              .map(playlist => (
                <Playlist key={playlist.name} playlist={playlist} />
              ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

export default App;
