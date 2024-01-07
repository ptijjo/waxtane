import { Request,Response,NextFunction } from "express"
import { UserInterface } from '../models/user/user.interface';
import { User } from '../models/user/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { token } from "morgan";

export class userController{

    public findAll = async (req: Request, res: Response) => {
        try {
            const allUser: UserInterface[] = await User.find();

            res.status(200).json({
                message: "status ok! 👍",
                length: allUser.length,
                response: allUser
            });
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            });
        }
    };

    public findById = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);

            console.log(user);
            
            res.status(200).json({
                message: "status ok! 👍",
                response: user
            })
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };

    public newUser = async (req: Request, res: Response) => {
        try {
            /**
             * @urlPicture change en fonction du choix du genre du client
             */
            let urlPicture: string;
            const urlFemme = `${req.protocol}://${req.get("host")}/src/models/user/picture/avatarFemme.png`;
            const urlHomme = `${req.protocol}://${req.get("host")}/src/models/user/picture/avatarHomme.png`;
            (req.body.genre === "Homme") ? urlPicture = urlHomme : urlPicture = urlFemme;

            /**
             * Vérifier si l'email est déja existant
             * si oui message d'erreur
             * sinon on crée le nouveau user en cryptant son mot de passe avec bcrypt avant de le stocker
             */
            const existUser = await User.findOne({ email: req.body.email });
            if (existUser !== null) return res.json({ response: "Email déjà existant !" });

            const mdpCrypte = await bcrypt.hash(req.body.password, 10);

            const newUser = await User.create({
                ...req.body,
                password: mdpCrypte,
                picture: urlPicture
            });

            res.status(201).json({
                message: "status ok! 👍",
                response: newUser
            });
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };

    public connection = async (req: Request, res: Response) => {
        try {
            const findUser: UserInterface | null = await User.findOne({ email: req.body.email });

            if (findUser === null) return res.status(401).json({
                message: "Identifiants incorrects !"
            });

            const findMdp = await bcrypt.compare(req.body.password, findUser.password);

            (!findMdp) && res.status(401).json({
                message: "Identifiants incorrects !"
            });
            
            console.log(findMdp);

            const creationToken = jwt.sign(
                {
                    userId: findUser._id,
                    userLastName: findUser.last_name,
                    userFirstName: findUser.first_name,
                    userEmail: findUser.email,
                    userPicture: findUser.picture
                },
                process.env.CODE_TOKEN as string,
                { expiresIn: process.env.EXPIRES_IN }
            );

            res.status(200).json({
                userId: findUser._id,
                userLastName: findUser.last_name,
                userFirstName: findUser.first_name,
                userEmail: findUser.email,
                userPicture: findUser.picture,
                token: creationToken
            })
            
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    };

    public userConnected = async (req: any, res: Response) => {
        try {
            const auth = req.headers.authorization.split(' ')[1];
            const decodedToken : any = jwt.verify(auth, process.env.CODE_TOKEN as string);
            const userId = decodedToken.userId;
            const userLastName = decodedToken.userLastName;
            const  userFirstName= decodedToken.userFirstName;
            const userEmail = decodedToken.userEmail;
            const userPicture = decodedToken.userPicture;

            res.status(200).json({ userLastName, userFirstName, userId, userPicture, userEmail });
            
        } catch (error) {
            res.status(400).json({
                message: "status fail! 🤯",
                response: error
            })
        }
    }
}