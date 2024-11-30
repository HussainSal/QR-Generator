import { createClient } from 'contentful-management';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const accessToken = configService.get<string>('CONTENTFUL_ACCESS_TOKEN');

export const client = createClient({
  accessToken: accessToken,
});

export async function uploadPdf(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
): Promise<{ fileUrl: string; assetId: string }> {
  try {
    // Step 1: Connect to the Contentful space and environment
    const space = await client.getSpace('96rq3jti88gs'); // Replace with your Space ID
    const environment = await space.getEnvironment('master'); // Replace with your Environment ID if not 'master'

    // Step 2: Upload the file to Contentful's direct upload endpoint
    const upload = await environment.createUpload({ file: fileBuffer });
    console.log('File uploaded to Contentful:', upload);

    // Step 3: Create an asset linked to the uploaded file
    const asset = await environment.createAsset({
      fields: {
        title: {
          'en-US': fileName, // File name
        },
        file: {
          'en-US': {
            contentType, // MIME type (e.g., application/pdf)
            fileName, // Original file name
            uploadFrom: {
              sys: {
                type: 'Link',
                linkType: 'Upload',
                id: upload.sys.id,
              },
            },
          },
        },
      },
    });

    console.log('Asset created:', asset);

    // Step 4: Process and publish the asset
    const processedAsset = await asset.processForLocale('en-US');
    const publishedAsset = await processedAsset.publish();

    console.log('Asset published:', publishedAsset);

    // Step 5: Retrieve the URL of the uploaded file

    const fileUrl = `https:${publishedAsset.fields.file['en-US'].url}`;
    const assetId = publishedAsset.sys.id; // Asset ID for deletion

    // Return both the URL and Asset ID
    return { fileUrl, assetId };
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw new Error('Failed to upload PDF to Contentful');
  }
}

// {
//     sys: {
//       id: '1q0RUVcQU9TJsRPzBqZCJf',
//       createdAt: '2024-11-29T02:33:27.000Z',
//       expiresAt: '2024-12-01T00:00:00.000Z',
//       createdBy: { sys: [Object] },
//       type: 'Upload',
//       space: { sys: [Object] },
//       environment: { sys: [Object] }
//     }
//   }
