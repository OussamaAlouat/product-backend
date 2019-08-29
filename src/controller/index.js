const index = (req, res) => {
    const response =  {data : {message: 'Server up!!'}};
    res.json(response);
};

export {index};