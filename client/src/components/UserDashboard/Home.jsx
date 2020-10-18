import React, { Component } from "react";
import { connect } from "react-redux";
import { getImages, emptyImages } from "../../redux/actions/imagesAction";
import InfiniteScroll from "react-infinite-scroll-component";
import style from "../UserDashboard/Home.module.css";
import axios from "axios";

class UserDashboard extends Component {
  state = {
    count: 1,
  };

  componentDidMount() {
    this.props.emptyImages();
    this.props.getImages(1);
  }

  fetchImage = () => {
    this.setState(
      (prevState) => ({
        count: prevState.count + 1,
      }),
      () => {
        this.props.getImages(this.state.count);
      }
    );
  };

  addFavourites = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    await axios.post(
      `/add/favourite/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  };

  render() {
    return (
      <div className={style.row}>
        <InfiniteScroll
          dataLength={
            this.props.images !== null ? this.props.images.length : null
          }
          hasMore={true}
        >
          <div className={style.column}>
            {this.props.images !== null
              ? this.props.images.map((image) => (
                  <div className={style.imageDiv}>
                    <img src={image.download_url} key={image._id} />
                    <small className={style.author}>{image.author}</small>
                    <div className={style.list}>
                      <button onClick={() => this.addFavourites(image._id)}>
                        Add Favourite
                      </button>
                      <button>Download</button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </InfiniteScroll>
        <button onClick={this.fetchImage} className={style.btn}>
          Load More
        </button>
      </div>
    );
  }
}

const mapStateProps = (storeState) => {
  return {
    images: storeState.images.images,
  };
};

export default connect(mapStateProps, { getImages, emptyImages })(
  UserDashboard
);
