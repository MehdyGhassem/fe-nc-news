import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Paper } from '@mui/material';

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:10000/api/articles')
            .then((response) => response.json())
            .then((data) => {
                setArticles(data.articles);
            })
            .catch((error) => {
                console.error('Error fetching articles:', error);
            });
    }, []);

    if (articles.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', marginTop: 5 }}>
                <Typography variant="h6" color="text.secondary">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: '800px', margin: 'auto', padding: 2 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                Articles
            </Typography>
            <List>
                {articles.map((article) => (
                    <ListItem key={article.article_id} disablePadding>
                        <Paper 
                            elevation={2} 
                            sx={{ 
                                width: '100%', 
                                padding: 2, 
                                marginBottom: 2, 
                                '&:hover': { backgroundColor: '#f9f9f9' } 
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                By {article.author} • {new Date(article.created_at).toLocaleDateString()}
                            </Typography>
                        </Paper>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ArticlesPage;
