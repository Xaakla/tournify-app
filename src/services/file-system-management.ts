import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export function selectImage() {
  return new Promise(async (resolve, reject) => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      quality: 1,
      base64: false
    });

    console.log(result);

    if (!result.cancelled) {
      resolve({uri: result.uri, status: true});
    }

    reject({status: false});
  });
}

export function saveImage(imageUri: string, id: string) {
  return new Promise(async (resolve) => {
    const USER_PHOTO_DIR = FileSystem.documentDirectory + 'photos';
    const imageName = `${id}.png`;
    const photoSource = `${USER_PHOTO_DIR}/${imageName}`;

    const dirInfo = await FileSystem.getInfoAsync(USER_PHOTO_DIR);
    if (!dirInfo.exists) {
      console.log("Photo directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(USER_PHOTO_DIR, { intermediates: true });
    }

    await FileSystem.copyAsync({
      from: imageUri,
      to: photoSource,
    });

    resolve(true);
  });
}

export function getImage(imageUri: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    await FileSystem.getContentUriAsync(imageUri)
      .then((cUri: string) => {
        resolve(cUri);
      }).catch(err => {
        reject(`Error trying get image: ${err}`);
      })
  });
}
