import checkJWT from "../middlewares/checkJWT";
import controller from "./music.controller";
import usersController from "../users/users.controller";


exports.changeFile  = async (req, res) => {
  const { location, size, key } = req.file;

  if (!location || !size || !key) {
    return res.status(400).send({ message: "FAIL UPLOAD S3" });
  }

  const auth = checkJWT(req.headers);

  if (auth === false) {
    return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
  }

  const user = await controller.findOneUser(auth);
  const data = {
    id: req.params.musicId,
    path: location,
    size: size,
    file: key,
  };

  const music = await controller.findOneMusic(data.id, user);

  if (!music) {
    return res.status(401).send({ message: "NOT MUSIC UPLOADER USER" });
  }

  const result = controller.updateFile(data);

  if (result === false) {
    return res.status(400).send({ message: "FAIL SAVE NEW FILE" });
  }

  return res.status(200).send(data);
};



exports.checkUser  = async (req, res) => {
  try {
    const { id } = req.body;
    const result = checkJWT(req.headers);

    if (result == false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }
    // Update Music before Check User Accecs
    if (id) {
      const data = {
        username: result.username,
        userId: result.userId,
      };
      const music = await controller.findOneMusic(id, data);

      return res.status(200).send(music);
    }
    // Create Music before Check User Accecs
    const data = {
      userId: result.id,
      username: result.username,
    };

    return res.status(200).send(data);
  } catch (err) {
    console.error(err.message);

    return res.status(400).send({ message: "ERROR" });
  }
};



exports.detailMusic  = async (req, res) => {
  try {
    const id = req.params.musicId;
    const music = await controller.findOneMusic(id);

    return res.status(200).send(music);
  } catch (err) {
    console.error(err.message);
    
    return res.status(400).send({ message: "ERROR" });
  }
};


exports.searchMusic  = async (req, res) => {
  try{    
    const query = req.query.music;
    const musicList = await controller.findAllMusic(query);
    
    if (musicList.length === 0) {
      return res.status(200).send({ message: '검색하신 곡이 없습니다.' })
    }

    return res.status(200).send(musicList);
  }catch (err) {
    console.error(err.message)

    return res.status(400).send({ message: "ERROR" })
  }

}

exports.updateMusic  = async (req, res) => {
  const { name, album, artist } = req.body;

  console.log(req.body)

  if (!name || !album || !artist) {
    return res.status(400).send({ message: "NEED MUSIC INFO---------" });
  }

  const auth = checkJWT(req.headers);

  if (auth === false) {
    return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
  }

  const user = await usersController.findOneUser(auth);
  const data = {
    id: req.params.musicId,
    name,
    album,
    artist,
  };
  const music = await controller.findOneMusic(data.id, user);

  if (!music) {
    return res.status(401).send({ message: "NOT MUSIC UPLOADER USER" });
  }

  const result = controller.updateMusic(data);

  if (result === false) {
    return res.status(400).send({ message: "FAIL SAVE NEW FILE" });
  }

  return res.status(200).send(data);
};


exports.uploadMusic  = (req, res) => {
  const { name, album, artist } = req.body;
  const { location, size, key } = req.file;

  if (!name || !album || !artist || !location || !size || !key) {
    return res.status(400).send({ message: "NEED MUSIC INFO" });
  }

  const data = {
    name,
    album,
    artist,
    path: location,
    size,
    file: key,
    userId: req.params.userId,
    username: req.params.username,
  };
  const result = controller.createMusic(data);

  if (result === false) {
    return res.status(400).send({ message: "FAIL SAVE NEW FILE" });
  }

  return res.status(200).send({ message: "SAVE NEW FILE" });
};
