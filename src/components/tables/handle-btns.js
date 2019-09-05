const btns = {
    delete: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: '#62B1FD'
                },
                on: {
                    click: () => {
                        vm.$emit('on-delete', params);
                        // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                    }
                }
            },
            '删除'
        );
    },
    allot: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: '#62B1FD'
                },
                on: {
                    click: () => {
                        vm.$emit('on-allot', params);
                    }
                }
            },
            '等级分配'
        );
    },
    edit: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: '#62B1FD'
                },
                on: {
                    click: () => {
                        vm.$emit('on-edit', params);
                    }
                }
            },
            '编辑'
        );
    },
    details: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: '#62B1FD'
                },
                on: {
                    click: () => {
                        vm.$emit('on-details', params);
                    }
                }
            },
            '详情'
        );
    },
    status: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: '#62B1FD'
                },
                on: {
                    click: () => {
                        vm.$emit('on-change-status', params);
                    }
                }
            },
            params.row.status ? '停用' : '启用'
        );
    },
    frost: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: params.row.type ? '#EBEBEB' : '#57A3F3'
                },
                on: {
                    click: () => {
                        vm.$emit('on-change-frost', params);
                    }
                }
            },
            params.row.status ? '解冻' : '冻结'
        );
    },
    frostStatus: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: params.row.type ? '#EBEBEB' : '#57A3F3'
                },
                on: {
                    click: () => {
                        vm.$emit('on-change-status', params);
                    }
                }
            },
            params.row.status ? '停用' : '启用'
        );
    },
    odds: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: '#62B1FD'
                },
                on: {
                    click: () => {
                        vm.$emit('on-check-odds', params);
                    }
                }
            },
            '赔率'
        );
    },
    remove: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: '#62B1FD'
                },
                on: {
                    click: () => {
                        vm.$emit('on-remove', params);
                    }
                }
            },
            '移出黑名单'
        );

    },
    initialize: (h, params, vm) => {
        return h(
            'a', {
                style: {
                    margin: '0 5px',
                    color: '#62B1FD'
                },
                on: {
                    click: () => {
                        vm.$emit('on-initialize', params);
                    }
                }
            },
            '初始化'
        );
    }
};
export default btns;