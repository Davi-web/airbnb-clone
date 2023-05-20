import prisma from "@/app/libs/prismadb";

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });

        const safeListing = listings.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));
        return safeListing;

    } catch(e: any) {
        throw new Error(e);
    }

}