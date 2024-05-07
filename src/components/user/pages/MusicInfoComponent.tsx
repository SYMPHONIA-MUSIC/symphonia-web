import React, {useState, useEffect, ChangeEvent} from 'react';
import {
    Box,
    IconButton,
    Slider,
    Typography,
    Stack,
    Rating,
    List,
    ListItem,
    ListItemAvatar,
    Avatar, ListItemText, TextField, Button, Collapse
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { usePalette } from "color-thief-react";
import {Cancel, ExpandLess, ExpandMore, PlayCircle, Reply, ThumbDown, ThumbUp, VolumeDown} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import {useTheme} from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import ContentWrapper from "../../artist/ContentWrapper";
import MusicInfoContentWrapper from "../../wrapper/MusicInfoContentWrapper";

interface HSL {
    h: number;
    s: number;
    l: number;
}

// Функция для конвертации HEX в HSL
const hexToHSL = (hex: string): HSL => {
    let r: any = parseInt(hex.slice(1, 3), 16);
    let g: any = parseInt(hex.slice(3, 5), 16);
    let b: any = parseInt(hex.slice(5, 7), 16);
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number = 0; // Инициализация h как 0 для обработки ахроматического случая
    let s: number, l: number = (max + min) / 2;

    if (max === min) {
        s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h, s, l };
};

const MusicInfoComponent: React.FC = () => {
    const theme = useTheme();
    const imgSrc = "https://i.scdn.co/image/ab6761610000e5eb4da10fe422c268ee9a5044cd";
    const [color, setColor] = useState(theme.palette.primary.main);
    const [playing, setPlaying] = useState(false);
    const { data, loading } = usePalette(imgSrc, 5, 'hex', { crossOrigin: 'anonymous' });

    const [userRating, setUserRating] = useState<number>(0);
    const [comment, setComment] = useState('');
    const [replyTo, setReplyTo] = useState<number | null>(null);

    const [openReplies, setOpenReplies] = useState<Record<number, boolean>>({});

    const handleToggleReplies = (id: number) => {
        setOpenReplies(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const likes = 120;
    const dislikes = 30;
    const totalReactions = likes + dislikes;

    useEffect(() => {
        if (!loading && data) {
            const colorsWithHSL = data.map(color => ({
                hex: color,
                hsl: hexToHSL(color)
            }));

            const brightestColor = colorsWithHSL.sort((a, b) => b.hsl.l - a.hsl.l)[0].hex;
            setColor(brightestColor);
        }
    }, [data, loading, theme.palette.primary.main]);

    type RatingsDetails = {
        [key: string]: number;
    };

    const ratings = {
        total: 52,
        average: 4.0,
        details: {
            '5': 80,
            '4': 10,
            '3': 5,
            '2': 3,
            '1': 2
        } as RatingsDetails
    };

    const comments = [
        {
            id: 1,
            author: "John Doe",
            text: "Really enjoyed this track!",
            rating: 4,
            replies: [
                { author: "Alice Johnson", text: "Totally agree!", rating: 5 }
            ]
        },
        {
            id: 2,
            author: "Jane Smith",
            text: "Not my style, but well produced.",
            rating: 3,
            replies: []
        }
    ];

    const handleReplyClick = (id: number) => {
        setReplyTo(id); // Установка ID комментария, на который отвечают
    };

    const handleCancelReply = () => {
        setReplyTo(null); // Отмена ответа
    };

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = () => {
        console.log("Submit comment:", comment);
        setComment('');
        setUserRating(0);
    };

    const handleCancelRating = () => {
        setUserRating(0);
    };

    return (
        <MusicInfoContentWrapper>
            <Box sx={{ width: '100%',
                backgroundImage: `linear-gradient(${color}, ${color}00)`,
                pt: 10,
                display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ pt: 3 }}>
                    <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={imgSrc} alt="Cover" style={{ width: '100%', borderRadius: 12 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 2 }}>
                            <Box>
                                <Typography variant="h6" component="div">Money Machine</Typography>
                                <Typography variant="body2" component="div" sx={{ alignSelf: 'flex-start' }}>1000 Gecks</Typography>
                            </Box>
                            <Box>
                                <IconButton color="error">
                                    <PlayCircle style={{ fontSize: '50px' }} />
                                </IconButton>
                                <IconButton color="error">
                                    <FavoriteIcon style={{ fontSize: '50px' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Paper sx={{ width: '80%', mt: 3, p: 2, backgroundColor: theme.palette.background.alternate, borderRadius: 10 }}>
                <Typography variant="h5" sx={{ px: 3, py: 2, fontWeight: 500 }}>Hodnocení</Typography>

                <Box sx={{ px: 3, py: 2, backgroundColor: theme.palette.background.default, borderRadius: 8, display: 'flex', mx: 6, mt: 1, justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box sx={{ maxWidth: 400, width: '100%' }}>
                        {Object.keys(ratings.details).reverse().map((star) => (
                            <Box key={star} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Typography variant="body2" sx={{ width: '40px', textAlign: 'end' }}>{`${star} ★`}</Typography>
                                <LinearProgress variant="determinate" value={ratings.details[star]} sx={{ flexGrow: 1, mx: 1, width: 'auto', minWidth: '30px' }} />
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', mr: 2 }}>
                        <Typography variant="h3" sx={{ fontWeight: 600 }}>{ratings.average.toFixed(1)}</Typography>
                        <Rating name="read-only" value={ratings.average} readOnly />
                        <Typography variant="body2" sx={{ mb: 2 }}>{`${ratings.total} Hodnocení kritiků`}</Typography>

                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', px: 7, py: 3 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton color="primary">
                                <ThumbUp style={{ fontSize: '30px' }} />
                            </IconButton>
                            <Typography variant="h6">{likes}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton color="secondary">
                                <ThumbDown style={{ fontSize: '30px' }} />
                            </IconButton>
                            <Typography variant="h6">{dislikes}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', ml: 2 }}>
                        <Typography variant="h4">{totalReactions}</Typography>
                        <Typography variant="subtitle1">Celkový počet reakcí uživatelů</Typography>
                    </Box>
                </Box>

                <Typography variant="h5" sx={{ px: 3, py: 2, fontWeight: 500 }}>Komentáře</Typography>

                {/*// COMMENTS*/}

                <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    {comments.map((comment) => (
                        <ListItem key={comment.id} sx={{ mb: 2, flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={comment.author}
                                    secondary={comment.text}
                                    sx={{ mr: 2, flexGrow: 1 }}
                                />
                                <IconButton onClick={() => handleReplyClick(comment.id)}>
                                    <Reply />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 7, cursor: 'pointer', mt: 1 }}>
                                <Typography variant="caption" onClick={() => handleToggleReplies(comment.id)}>
                                    {comment.replies.length > 0 ? `${comment.replies.length} replies` : "Reply"}
                                </Typography>
                                <IconButton onClick={() => handleToggleReplies(comment.id)} size="small">
                                    {openReplies[comment.id] ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Box>
                            <Collapse in={openReplies[comment.id] || false} timeout="auto" unmountOnExit>
                                {comment.replies.map((reply, index) => (
                                    <Box key={index} sx={{ pl: 4, width: '100%' }}>
                                        <Typography component="div" variant="body2">{reply.author}: {reply.text}</Typography>
                                    </Box>
                                ))}
                            </Collapse>
                        </ListItem>
                    ))}
                </List>


                {replyTo && (
                    <Typography sx={{ mt: 1, mb: 1 }}>
                        Replying to comment ID {replyTo}
                        <IconButton onClick={handleCancelReply}>
                            <Cancel />
                        </IconButton>
                    </Typography>
                )}
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    value={comment}
                    onChange={handleCommentChange}
                    variant="outlined"
                    placeholder="Type your comment here..."
                    sx={{ my: 2 }}
                />
                <Rating
                    name="simple-controlled"
                    value={userRating}
                    onChange={(event, newValue) => {
                        setUserRating(newValue ?? 0);
                    }}
                />
                <Button variant="contained" onClick={handleSubmitComment}>
                    Submit Comment
                </Button>
            </Paper>
        </MusicInfoContentWrapper>
    );
}

export default MusicInfoComponent;
