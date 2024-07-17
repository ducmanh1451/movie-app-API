const {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Prefix: "images/",
};

module.exports = () => ({
  // get all images
  async getImages(req, res) {
    try {
      try {
        const { Contents } = await s3Client.send(
          new ListObjectsV2Command(params)
        );
        const images = Contents.filter(
          (object) => object.Key !== params.Prefix
        ).map((object) => ({
          key: object.Key,
          url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${object.Key}`,
        }));

        res.status(200).json({ payload: images });
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ảnh từ S3:", error);
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // upload images
  async uploadImages(req, res) {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: "Không có file nào được chọn" });
      }
      const files = req.files.files;

      const uploadedFiles = [];

      const uploadToS3 = async (file) => {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `images/${file.name}`,
          Body: file.data,
          ContentType: file.mimetype,
        };

        await s3Client.send(new PutObjectCommand(params));
        uploadedFiles.push({
          key: `images/${file.name}`,
          url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/images/${file.name}`,
        });
      };

      if (Array.isArray(files)) {
        for (let file of files) {
          await uploadToS3(file);
        }
      } else {
        await uploadToS3(files);
      }

      res
        .status(200)
        .json({ message: "Upload thành công", files: uploadedFiles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // delete images
  async deleteImages(req, res) {
    try {
      const { images } = req.body;

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: {
          Objects: Object.values(images).map((key) => ({ Key: key })),
          Quiet: false,
        },
      };
      await s3Client.send(new DeleteObjectsCommand(deleteParams));
      res.status(200).json({ message: "Xóa ảnh thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
});
