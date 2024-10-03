import axios from 'axios';
import * as path from 'path';
import {imageFormatter} from './formatting'
interface ResponseData {
  success: boolean;
  message: string;
  imageUrls: string[];
}
// we're going to make an image object, which has properties of url, caption, and name
interface Image {
    url: string;
    caption: string;
    file_id: string;
}
// give example use of interface
interface serverResponse{
    numImages: number;
    imageData: Image[];


}

const webhookKey = 'test1';

async function sendRequest(numImages:number,URL:string,api_key:string): Promise<serverResponse[]> {
  try {
    const response = await axios.post<ResponseData>(URL+'/controller', {numImages: numImages,type:'firstQuery',apiKey:api_key});
    // response 

    // response of the form {'0':{url: 'url',caption: 'caption'},'1':{url: 'url',caption: 'caption'}...}
    // we need to get the number of images in the response, as it's possible it's less than the number of tags
    
    console.log('Response:', response.data);

    if (response.data.success) {
        // we're going to loop through the response
        const imageData = Object(response.data);
        console.log('Image URLs:', imageData);
        return [{imageData:imageData.imageUrls,numImages:imageData.numImages}];
      // Process the image URLs as needed
    } else {
      console.error('Error:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return []
}

function extractFileNameFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
}
async function downloadAndSaveImage(imageUrl: string,url:string): Promise<string> {
    console.log('download and save image',imageUrl)
    // this downloads the image to a path, and then returns the path
    const fileName = extractFileNameFromUrl(imageUrl);
    console.log('filename',fileName)
    //   the filepath should be the filename, plus wherever obsidian has the images supposed to be saved by default
    const attachmentFolder = this.app.vault.getConfig('attachmentFolderPath');
    const filePath = path.join(attachmentFolder, fileName);
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      


      await this.app.vault.createBinary(filePath, buffer);
      console.log(`Image ${fileName} saved successfully.`);
      
    } catch (error) {
      console.error(`Error downloading image ${imageUrl}:`, error);
    }
    return filePath;
  }

async function deleteImages(imageIDs: string[],URL:string,api_key:string): Promise<void> {
    try {
      const response = await axios.post<ResponseData>(URL+'/confirmation', {imageIDs: imageIDs,apiKey:api_key});
      if (response.data.success) {
        console.log('Images deleted successfully.');
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
export async function imageRequestor(numImages:number,url:string,api_key:string): Promise<string[]>{
    console.log("Image Requestor");
    // we need to make a network request to the server at localhost:8000, and return the response

    const response = await sendRequest(numImages,url,api_key);
    const images = response[0].imageData;
    const numResponded = response[0].numImages;
    
    // convert images into an array of image objects
    console.log('images requestor func',images)
    
    if(numResponded === 0){
        return []
        // the trivial case, if the server doesnt have any images we return a blank array
    }
    else{
        let paths: string[] = [];
        let urls:string[] = [];
        let captions:string[] = [];
        let IDs:string[] = [];
        console.log(numResponded)
        for(let i = 0; i < (numResponded); i++){
            urls.push(images[i].url);
            captions.push(images[i].caption);
            IDs.push(images[i].file_id);
        }
        console.log(urls);
        paths = await Promise.all(urls.map(image => downloadAndSaveImage(image,url)));
        // return the local image paths
        console.log('paths test',paths)
        // now we want to send another request to the server, with the ID's of the images we just downloaded, so that it can delete them
        console.log('ID',images[0].file_id)
        await deleteImages(IDs,url,api_key);
        return imageFormatter(paths,captions);

    }
    return ["img1","img2","img3"]
}

