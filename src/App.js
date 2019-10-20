import React from 'react';
import './App.css';
import {NotificationManager} from 'react-notifications';
import socialService from './Services/social';

let style = {
  appheader : {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  },
  input : {
    padding: 5,
    borderRadius: '10px'
  },
  button : {
    padding : 5,
    margin :5,
    borderRadius : 5,
    cursor:'pointer',
    backgroundColor: '#4267b2',
    borderColor: '#4267b2',
    color : 'white'
  },
  urls : {
    backgroundColor:'white',
    margin : 5,
    padding : '0 5px'
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facebookUsername : '',
      facebookUsernameError : '',
      instagramUrl : '',
      instagramUrlError : '',
      twitterUrl: '',
      twitterUrlError: '',
      pinterestUrl : '',
      pinterestUrlError : ''
    }
  }

  checkValidUrls = async () => {
    if( this.state.facebookUsername === '' ){
      NotificationManager.error('Please enter valid Username', 'Error!');
      this.setState({
        facebookUsernameError : 'Please enter valid Username'
      });
     return false;
    }

    let urls = {
      instagramUrl : `https://www.instagram.com/${ this.state.facebookUsername}`,
      twitterUrl : `https://twitter.com/${ this.state.facebookUsername}`,
      pinterestUrl : `https://in.pinterest.com/${ this.state.facebookUsername}`
    }
    let facebookUrl = `https://www.facebook.com/${ this.state.facebookUsername}`

    let response = await socialService.checkValidUrl( facebookUrl);
    console.log(
      '**response**', response.data
    );
    urls.instagramUrlError = '';
    urls.twitterUrlError = '';
    urls.pinterestUrlError = '';
    if( response && response.data && response.data.status === 200 ){
      response = await socialService.checkValidUrl( urls.instagramUrl );
      if( response.data.status !== 200 ){
        urls.instagramUrl = ''
        urls.instagramUrlError = 'Profile Not exist'
      }
      response = await socialService.checkValidUrl( urls.twitterUrl );
      
      if( response.data.status !== 200 ){
        urls.twitterUrl = ''
        urls.twitterUrlError = 'Profile Not exist'
      }
      response = await socialService.checkValidUrl( urls.pinterestUrl );
      if( response.data.status !== 200 ){
        urls.pinterestUrl = ''
        urls.pinterestUrlError = 'Profile Not exist'
      }
      this.setState(
        urls
      )
    } else{
      NotificationManager.error('Please enter valid Username', 'Error!');
      return false;
    }    
  }

  render() {
    const { 
      facebookUsername, instagramUrl, twitterUrl, pinterestUrl,
      instagramUrlError, twitterUrlError, pinterestUrlError
    } = this.state;
    return (
      <div className="App">
        <header className="" style={style.appheader}>
          <div>
            <h3>
              Check Valid Urls
            </h3>
          </div>
          <div>
            <p>
              Facebook URL is :
            </p>
            <p>
            https://www.facebook.com/
            <input
              style={style.input}
              type="text"
              //defaultValue = {facebookUsername}
              value = {facebookUsername}
              onChange={(e)=>{
                this.setState({
                  facebookUsername : e.target.value,
                  facebookUsernameError : ''
                })
              }}
              placeholder="fashiongrunge"
            />
            <input
              style={style.button}
              type="button"
              value="Check other Urls"
              onClick={()=>{
                this.checkValidUrls()
              }}
            />
            </p>
            
          </div>
          <div>
            { (instagramUrl !== ''  || instagramUrlError) &&
            <p>
              Instagram URL is : {instagramUrlError}
              {instagramUrl !== '' &&
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
               <span style={style.urls}>
               {instagramUrl}
               </span>
              </a>
              }
            </p>
            }
            { (twitterUrl !== ''  || twitterUrlError) &&
            <p>
              Twitter URL is : {twitterUrlError}
              {twitterUrl !== '' &&
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
               <span style={style.urls}>
               {twitterUrl}
               </span>
              </a>
              }
            </p>
            }
            {(pinterestUrl !== '' || pinterestUrlError) &&
            <p>
              Pinterest URL is : {pinterestUrlError}
              {pinterestUrl !== '' &&
              <a href={pinterestUrl} target="_blank" rel="noopener noreferrer">
               <span style={style.urls}>
               {pinterestUrl}
               </span>
              </a>
              }
            </p>
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
