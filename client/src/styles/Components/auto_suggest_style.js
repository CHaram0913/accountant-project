export default theme => ({
    suggestion_container: {
        flexGrow: 1,
        position: 'relative',
        height: 'auto'
    },
    suggestion_container_open: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    suggestion: {
        display: 'block'
    },
    suggestion_list: {
        margin: 0,
        padding: 0,
        listStyleType: 'none'
    }
})