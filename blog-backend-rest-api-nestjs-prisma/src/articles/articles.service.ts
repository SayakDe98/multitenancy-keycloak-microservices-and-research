import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { getPrisma } from 'src/client';
import { runBashScript } from 'migrate-to-new-schema';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(
    private prisma: PrismaService,
    ) {}

  async create(createArticleDto: CreateArticleDto) {
    try {
      const article = this.prisma.article.create({ data: createArticleDto });
      if(createArticleDto?.title && article) {
        console.log('hello')
        const data  = await this.prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS ${createArticleDto?.title}`);  
        console.log('hello data', data);
        await runBashScript(createArticleDto?.title, `mig-${createArticleDto?.title}`);
      }
      return article;
    } catch (error) {
      console.log(error);
    }
  }

  findDrafts() {
    const schema = 'drafts'; //this tenant name will come from token
    // getPrisma
    // return this.prisma.article.findMany({ where: { published: false } });
    return getPrisma(schema).article.findMany({ where: { published: false } });
  }

  findAll() {
    const schema = 'string11';
    // return this.prisma.article.findMany({ where: { published: true } });
    const prisma1 = new PrismaClient({
      datasources: {
        db: { url: process.env.DATABASE_URL + `?schema=${schema}` },
      },
    });
    return prisma1.article.findMany({
      where: { published: true },
      // Assuming 'your_table_name' is the actual table name; replace it with your actual table name
    });
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
