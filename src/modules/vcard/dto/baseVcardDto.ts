import { ApiProperty } from '@nestjs/swagger';

export class BaseVcardDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty({ required: false })
    lastName?: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    contact: string;

    @ApiProperty({ required: false })
    title?: string;

    @ApiProperty({ required: false })
    company?: string;

    @ApiProperty({ required: false })
    yourJob?: string;

    @ApiProperty({ required: false })
    address?: string;

    @ApiProperty({ required: false })
    website?: string;

    @ApiProperty({ required: false })
    summary?: string;

    @ApiProperty({ required: false })
    instaUrl?: string;

    @ApiProperty({ required: false })
    facebookUrl?: string;

    @ApiProperty({ required: false })
    githubUrl?: string;

    @ApiProperty({ required: false })
    telegramUrl?: string;

    @ApiProperty({ required: false })
    twitter?: string;

    @ApiProperty({ required: false })
    welcomeScreen?: string;

    @ApiProperty({ required: false })
    directions?: string;

    @ApiProperty({ required: false })
    background?: string;

    @ApiProperty({ required: false })
    styling?: string;
}