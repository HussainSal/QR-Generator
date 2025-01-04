import { User } from 'src/modules/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class SocialMediaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (User) => User.socialMedia)
  user: User;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  headLine: string;

  @Column({ nullable: true })
  aboutUs: string;

  @Column({ nullable: true })
  sharing: string;

  @Column({ nullable: true })
  instaUrl: string;

  @Column({ nullable: true })
  facebookUrl: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  telegramUrl: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  welcomeScreen: string;

  @Column({ nullable: true })
  welcomeScreenId: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  imageId: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: true })
  styling: string;
}

export default SocialMediaEntity;
