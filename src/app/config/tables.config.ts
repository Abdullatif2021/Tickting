export const TablesConfig = {
    // normal tables structure
    table: {
        tickets: {
            cols: [
                {
                    name: 'color',
                    sortable: false,
                },
                {
                    name: 'subject',
                    sortable: true,
                },
                {
                    name: 'status',
                    sortable: true,
                },
                {
                    name: 'destination',
                    sortable: true,
                },
                {
                    name: 'problemarea',
                    sortable: true,
                },
                {
                    name: 'progress',
                    sortable: true,
                }
            ]
        },
        activities: {
            cols: [
                {
                    name: 'color',
                    sortable: false,
                },
                {
                    name: 'subject',
                    sortable: true,
                },
                {
                    name: 'status',
                    sortable: true,
                },
                {
                    name: 'assign',
                    sortable: true,
                },
                {
                    name: 'tester',
                    sortable: true,
                },
                {
                    name: 'priority',
                    sortable: true,
                },
                {
                    name: 'time',
                    sortable: true,
                },
                {
                    name: 'progress',
                    sortable: true,
                }
            ]
        },
    }
};
