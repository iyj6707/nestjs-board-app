import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.prisma.board.findUnique({
            where: { id },
        });

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async getAllBoards(user: User): Promise<Board[]> {
        return await this.prisma.board.findMany();
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.prisma.board.create({
            data: {
                ...createBoardDto,
                status: BoardStatus.PUBLIC
            }
        })
    }

    async deleteBoard(id: number): Promise<void> {
        await this.prisma.board.delete({
            where: {
                id: id
            }
        });
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.prisma.board.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });

        return board;
    }
}
