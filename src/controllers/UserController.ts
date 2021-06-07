import db from "../models";

export const getUsers = async () => {
    const users = await db.User.findAll({
        include: {
            model: db.Project
        }
    });

    return users;
}

export const createUser = async ({ body }: { body: any }) => {
    const rUser = await db.User.findOne({
        where: {
            email: body.email
        }
    })

    if (rUser) {
        throw new Error("Duplicated");
    }

    return await db.User.create(body);;
}

export const createProject = () => {
}

export const createAssginments = () => {
}



