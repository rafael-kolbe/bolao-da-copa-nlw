import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function guessRoutes(fastify: FastifyInstance) {
    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();

        return { count };
    });

    fastify.post(
        '/pools/:poolId/games/:gameId/guesses',
        { onRequest: [authenticate] },
        async (req, res) => {
            const createGuessParams = z.object({
                poolId: z.string(),
                gameId: z.string(),
            });

            const createGuessBody = z.object({
                firstTeamPoints: z.number(),
                secondTeamPoints: z.number(),
            });

            const { poolId, gameId } = createGuessParams.parse(req.params);
            const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(req.body);

            return {
                poolId,
                gameId,
                firstTeamPoints,
                secondTeamPoints,
            };
        },
    );
}
