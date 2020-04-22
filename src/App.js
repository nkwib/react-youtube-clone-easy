import React from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoList, VideoDetail } from './components/';


class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }

    handleSubmit = async (searchTerm) => {
        console.log(searchTerm)
        const res = await youtube.get('search', {
            params: {
                q: searchTerm,
                part: 'snippet',
                maxResults: 5,
                key: '[APIKEY]'
            }
        })
        this.setState({ videos: res.data.items, selectedVideo: res.data.items[0] });
    }

    render() {
        const {selectedVideo} = this.state
        return(
            <Grid justify='center' container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}></SearchBar>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}></VideoDetail>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList></VideoList>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;