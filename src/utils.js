import axios from "axios";
const PATH = 'https://pixabay.com';
const KEY = '24527882-d7d9e616188aea4cec7586a36';
const APIargs= '&image_type=photo&pretty=true'

/**
 * Return all Widgets
 * @returns {Promise<unknown>}
 */
 export const getPhotosFromServer = async (query) => {
    let photos = '';
    try {
        photos = await axios.get(`${PATH}/api/?key=${KEY}&q=${query}${APIargs}`);
        return photos.data.hits;
    } catch (err) {
        console.error(err);
    }
}