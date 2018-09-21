import { prismaContext } from '@trumpsaid/prisma';
import { Router } from 'express';

const router = Router();

router.get('/:slug', async (req, res, next) => {
  const exists = await prismaContext.exists.VideoUploadMetadata({ slug: req.params.slug, published: true });
  if (!exists) {
    return next();
  }

  const metadata =
    await prismaContext.query.videoUploadMetadata(
      { where: { slug: req.params.slug } },
      ' { id videoUpload { id } } ');
  const video = await prismaContext.query.videoUpload({ where: { id: metadata.videoUpload.id } });

  res.render('video', { video });
});

export default router;
