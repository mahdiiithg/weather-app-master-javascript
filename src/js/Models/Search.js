import axios from 'axios';

export default class Search {
  constructor(search) {
    this.search = search;
  }

  // Get results from search
  async getResults() {
    try {
      const res = await axios.get(
        `https://get-cities-ids.herokuapp.com/?q=${
          this.search
        }`
      );
      // Save the data on the object
      this.results = res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
