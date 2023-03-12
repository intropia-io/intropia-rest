/**
 * @swagger
 * components:
 *  schemas:
 *    Apply:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: cuid
 *        contactEmail:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export interface Apply {
    id: string;

    createdAt: string;
    updatedAt: string;
}



// id           String      @id @default(cuid())
// link         RefLink?    @relation(fields: [linkId], references: [id], onDelete: Cascade)
// linkId       String?
// quest        Quests?     @relation(fields: [questId], references: [id], onDelete: Cascade)
// questId      String?
// user         User        @relation(fields: [userId], references: [id], onDelete: Cascade)
// userId       String
// cv           ApplyCV     @relation(fields: [cvId], references: [id])
// cvId         String
// contactEmail String      @default("")
// status       ApplyStatus @default(NEW)
// createdAt    DateTime    @default(now())
// updatedAt    DateTime    @updatedAt


// APPLY CV
// id        String   @id @default(cuid())
// text      String
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// apply     Apply[]


// RefLink
// id           String        @id @default(cuid())
// shortId      String        @unique
// views        RefLinkView[]
// quests       Quests        @relation(fields: [questId], references: [id])
// questId      String
// refUserApply Apply[]
// createdBy    User          @relation(fields: [createdById], references: [id], onDelete: Cascade)
// createdById  String
// refAccount   RefAccount    @relation(fields: [refAccountId], references: [id], onDelete: Cascade)
// refAccountId String
// createdAt    DateTime      @default(now())
// updatedAt    DateTime      @updatedAt


// Ref Account

// id                String         @id @default(cuid())
// adminUser         User           @relation("adminUser", fields: [adminUserId], references: [id], onDelete: Cascade)
// adminUserId       String
// avatar            String?
// title             String?
// description       String?
// users             User[]
// defaultRefAccount User[]         @relation("defaultRefAccount")
// refLink           RefLink[]
// type              RefAccountType @default(PERSONAL)
// createdAt         DateTime       @default(now())
// updatedAt         DateTime       @updatedAt


//USER

// id                String             @id @default(cuid())
// refUserId         String?
// name              String?
// username          String?            @unique
// email             String?            @unique
// contactEmail      String?
// emailVerified     DateTime?
// image             String?
// firstName         String?
// lastName          String?
// description       String?
// resumeLink        String?
// twitterLink       String?
// githubLink        String?
// telegram          String?
// dynasty           Dynasty[]
// nonce             String?
// publicAddress     String?            @unique
// accounts          Account[]
// userAggrigation   UserAggrigation[]
// adminUser         RefAccount[]       @relation("adminUser")
// defaultRefAccount RefAccount?        @relation("defaultRefAccount", fields: [refAccountId], references: [id])
// refAccountId      String?
// apply             Apply[]
// refLink           RefLink[]
// refAccount        RefAccount[]
// experience        RewardExperience[]
// firstSignIn       Boolean            @default(false)
// optIn             Boolean            @default(false)
// createdAt         DateTime           @default(now())
// updatedAt         DateTime           @default(now()) @updatedAt