// 首页分类类目下面的页面
<template>
    <view>
        <view class="category_tab">
            <view class="category_tab_title">
                <view class="title_inner">
                    <uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text" active-color="#e2377b"></uni-segmented-control>
                </view>
                <view class="iconfont icon-sousuo"></view>
            </view>
            <scroll-view scroll-y enable-flex @scrolltolower="handleScrolltolower" class="category_tab_content">
                <view class="cate_item" v-for="(item,index) in vertical" :key="item.id">
                    <go-detail :list="vertical" :index="index">
                        <image :src="item.thumb" mode="widthFix" />
                    </go-detail>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import {uniSegmentedControl } from '@dcloudio/uni-ui'
import goDetail from "@/components/goDetail"
export default {
    data() {
        return {
            items: [
                {title: "最新", order: 'new'},
                {title: "热门", order: 'hot'},
            ],
            current: 0,
            params: {
                limit: 30,
                skip: 0,
                order: 'new'
            },
            id: 0,
            // 页面显示数据的数组
            vertical: [],
            // 标记是否还有下一页 数据
            hasMore: true
        }
    },
    // 页面加载完成之后 获取到上个页面中navigator标签传过来的id
    onLoad(options) {
        this.id = options.id
        this.getList()
    },
    components: {
        uniSegmentedControl,
        goDetail
    },
    methods: {
        onClickItem(e) {
            /*
                1.根据被点击的标题 切换标题
                2.切换order
                3.重新发送请求
            */
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            } else {
                // 点击的是相同的标题
                return
            }
            this.params.order = this.items[e.currentIndex].order
            this.params.skip = 0
            this.vertical = []
            this.getList()
        },
        getList() {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
                data: this.params
            }).then(result => {
                console.log(result);
                if(result.res.vertical.length === 0) {
                    this.hasMore = false
                    uni.showToast({
                        title: '没有更多数据了',
                        icon: 'none'
                    });
                    return
                }
                this.vertical = [...this.vertical,...result.res.vertical]
            })
        },
        // 页面滚动触底时触发事件 加载下一页数据
        handleScrolltolower() {
            if(this.hasMore) {
                this.params.skip += this.params.limit
                this.getList()
            } else {
                uni.showToast({
                    title: '没有更多数据了',
                    icon: 'none'
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .category_tab {
        .category_tab_title {
            position: relative;
            .title_inner {
                width: 60%;
                margin: 0 auto;
            }
            .icon-sousuo {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 5%;
            }
        }
        .category_tab_content {
            display: flex;
            flex-wrap: wrap;
            height: calc(100vh - 36px);
            .cate_item {
                width: 33.33%;
                border: 5rpx solid #fff;
                image {

                }
            }
        }
    }
</style>