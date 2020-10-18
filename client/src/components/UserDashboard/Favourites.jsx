import React, { Component } from "react";
import { connect } from "react-redux";
import { getFavourites, emptyImages } from "../../redux/actions/imagesAction";
import InfiniteScroll from "react-infinite-scroll-component";
import style from "../UserDashboard/Favourites.module.css";
import axios from "axios";

class Favourites extends Component {
  state = {
    count: 1,
  };
  componentDidMount() {
    this.props.emptyImages();
    this.props.getFavourites(1);
  }

  removeFavourite = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios.delete(`/delete/favourite/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    this.props.emptyImages();
    this.props.getFavourites(1);
    this.setState({ count: 1 });
  };

  fetchImage = () => {
    this.setState(
      (prevState) => ({
        count: prevState.count + 1,
      }),
      () => {
        this.props.getFavourites(this.state.count);
      }
    );
  };

  render() {
    return (
      <div className={style.row}>
        <InfiniteScroll
          dataLength={
            this.props.favourite !== null ? this.props.favourite.length : null
          }
          hasMore={true}
        >
          <div className={style.column}>
            {this.props.favourite !== []
              ? this.props.favourite.map((image) => (
                  <div className={style.imageDiv}>
                    <img src={image.download_url} key={image._id} />
                    <small className={style.author}>{image.author}</small>
                    <div className={style.list}>
                      <button
                        style={{ color: "black" }}
                        onClick={() => this.removeFavourite(image._id)}
                      >
                        Remove
                      </button>
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

const mapSateToProps = (state) => {
  return {
    favourite: state.images.favourites,
  };
};

export default connect(mapSateToProps, { getFavourites, emptyImages })(
  Favourites
);
