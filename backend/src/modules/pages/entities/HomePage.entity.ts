import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('home_page')
export class HomePage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  impact_phrase: string;

  @Column('text', { array: true })
  social_medias: { name: string; url: string }[];
}
