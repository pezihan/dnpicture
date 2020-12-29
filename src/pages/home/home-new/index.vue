<template>
    <view>
        <scroll-view scroll-y enable-flex @scrolltolower="handleScrolltolower" class="category_tab_content">
                <view class="cate_item" v-for="(item,index) in vertical" :key="item.id">
                    <go-detail :list="vertical" :index="index">
                        <image :src="item.thumb" mode="widthFix" />
                    </go-detail>
                </view>
            </scroll-view>
    </view>
</template>

<script>
import goDetail from "@/components/goDetail"
export default {
    data() {
        return {
            current: 0,
            params: {
                limit: 30,
                skip: 0,
                order: 'hot'
            },
            // 页面显示数据的数组
            vertical: [],
            // 标记是否还有下一页 数据
            hasMore: true
        }
    },
    mounted() {
        // 修改页面的标题
        uni.setNavigationBarTitle({
            title: '最新'
        });
        this.getList()
    },
    methods: {
        getList() {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/vertical/category/4e4d610cdf714d2966000000/vertical`,
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
    },
    components: {
        goDetail
    }
}
</script>

<style lang="scss" scoped>
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
</style>