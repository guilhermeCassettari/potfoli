import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('upload_images')
export class UploadImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  data: string;

  @Column()
  mimetype: string;
}
