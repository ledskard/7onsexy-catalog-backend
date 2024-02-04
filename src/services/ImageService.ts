require("dotenv").config();
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { Image } from "../entities/Image";
import { IDeleteImageDTO, IReturnImageDTO } from "../dtos/ImageDTO";
import { ImageRepository } from "../repositories/ImageRepository";

export default class ImageService {
  private readonly client: S3Client;
  private readonly imageRepository: ImageRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
    const s3Config: S3ClientConfig = {
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    };

    this.client = new S3Client(s3Config);
  }

  async saveFile(image: Image): Promise<IReturnImageDTO> {
    try {
      const match = image.base64.match(/data:(image\/[a-z]+);base64,/);
      if (!match) {
        throw new Error("Imagem base64 inválida");
      }
      const mimeType = match[1];
      const base64Data = image.base64.replace(match[0], "");

      const decodedImage = Buffer.from(base64Data, "base64");

      const maxSize = 30 * 1024 * 1024;
      if (decodedImage.length > maxSize) {
        throw new Error(
          "Imagem é muito grande. Tamanho máximo permitido é 30MB."
        );
      }

      const timestamp = new Date().getTime();
      const filenameWithVersion = `${timestamp}_${image.name}`;

      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: filenameWithVersion,
        Body: decodedImage,
        ContentType: mimeType,
      };

      await this.client.send(new PutObjectCommand(params));

      let imageUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

      if (process.env.APP_ENV === "local") {
        imageUrl = `http://localhost:4566/${params.Bucket}/${params.Key}`;
      }

      return {
        fileName: filenameWithVersion,
        imageUrl,
      };
    } catch (error) {
      console.log("Erro ao enviar arquivo: ", error);
    }
  }

  public async deleteFromS3(image: IDeleteImageDTO): Promise<void> { 
    
    image.id ? await this.imageRepository.deleteById(image.id) : null;
    const params = {
      Bucket: "7onsexycatalogo",
      Key: image.name,
    };
    try {
      const response = await this.client.send(new DeleteObjectCommand(params));
      // console.log("Arquivo deletado com sucesso: ", response);
    } catch (error) {
      // console.log("Erro ao deletar arquivo: ", error);
    }
  }
}
