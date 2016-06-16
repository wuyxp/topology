/**
 * Created by wuyang on 16/5/26.
 */


//主机接口设计

var nets = {
    'router' : [
        {
            'rtr_id'    :   'rtr-001',
            'rtr_name'  :   '路由rtr-001',
            'rtr_status':   '运行中',
            'rtr_ip'    :   '202.201.1.1',
            'rtr_subnet':   2,
        },{
            'rtr_id'    :   'rtr-002',
            'rtr_name'  :   '路由rtr-002',
            'rtr_status':   '运行中',
            'rtr_ip'    :   '202.201.1.1',
            'rtr_subnet':   1,
        },{
            'rtr_id'    :   'rtr-003',
            'rtr_name'  :   '路由rtr-003',
            'rtr_status':   '运行中',
            'rtr_ip'    :   '202.201.1.1',
            'rtr_subnet':   1,
        },{
            'rtr_id'    :   'rtr-004',
            'rtr_name'  :   '路由rtr-004',
            'rtr_status':   '运行中',
            'rtr_ip'    :   '202.201.1.1',
            'rtr_subnet':   1,
        }
    ],
    'subnet' : [
        {
            'net_id'    :   'base-net',
            'net_name'  :   '直接连入外网子网01',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   32,
            'type'      :   'public',
            'router_id' :   null
        },
        {
            'net_id'    :   'net-001',
            'net_name'  :   '连入路由器rtr-001子网01',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   32,
            'type'      :   'public',
            'router_id' :   'rtr-001'
        },{
            'net_id'    :   'net-002',
            'net_name'  :   '连入路由器rtr-001子网02',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   10,
            'type'      :   'public',
            'router_id' :   'rtr-001'
        },{
            'net_id'    :   'net-003',
            'net_name'  :   '直接连入外网子网02',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   10,
            'type'      :   'public',
            'router_id' :   null
        },{
            'net_id'    :   'net-004',
            'net_name'  :   '连入路由器rtr-002子网01',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   22,
            'type'      :   'public',
            'router_id' :   'rtr-002'
        },{
            'net_id'    :   'net-005',
            'net_name'  :   '直接连入外网子网03',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   10,
            'type'      :   'public',
            'router_id' :   null
        },{
            'net_id'    :   'net-006',
            'net_name'  :   '连入路由器rtr-002子网02',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   22,
            'type'      :   'public',
            'router_id' :   'rtr-002'
        },{
            'net_id'    :   'net-007',
            'net_name'  :   '连入路由器rtr-003子网01',
            'net_ip'    :   '192.168.2.1',
            'net_hostN' :   6,
            'type'      :   'public',
            'router_id' :   'rtr-003'
        }
    ]
};

var hosts = [
    {
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['base-net','net-002']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文',
        'create_date'   :   1464135759,
        'net_id'        :   ['base-net','net-001','net-002']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['base-net','net-001']
    },
    {
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-001']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-001']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-002']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows',
        'create_date'   :   146,
        'net_id'        :   ['net-002']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-002']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-003']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-003']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-003']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-004']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-004']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-004']
    },{
        'id'            :   'host-zasgt25a',
        'name'          :   '开发1',
        'status'        :   '运行中',
        'net'           :   'www',
        'ip'            :   '192.16.1.2',
        'mirror'        :   'Windows Server 2008 R2 Datacenter 简体中文 未激活',
        'create_date'   :   1464135759,
        'net_id'        :   ['net-004']
    }
]




















































