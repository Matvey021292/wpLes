var vm = new Vue({
    el: '#app',
    data: {
        formVisibility: false,
        json: null,
        default: 10,
        comments: []


    },
    methods: {
        activeForm: function () {
            this.formVisibility = true
        },
        fakePath: function () {
            var link = document.createElement('a');
            link.href = this.json.options.default_url;
            document.body.appendChild(link);
            link.click();
        },
        infiniteHandler($state) {
            setTimeout(() => {
                var temp = [];
                var newArry = this.json.comments.slice(0, this.default)
                for (let i = newArry.length + 1; i <= newArry.length; i++) {
                    temp.push(i);
                }
                this.default += 10;
                this.comments = newArry.concat(temp);
                if (this.json.comments.length <= newArry.length) {
                    $state.complete();
                }
                $state.loaded();
            }, 1000);
        }
    },
    created: function () {
        fetch("comments.js")
            .then(r => r.json())
            .then(json => {
                this.json = json
            });
    }
})
Vue.component('facebook-widget-en', {
    template: `<div class="reviews_section">
                    <a v-bind:href="url" class="reviews_section__photo">
                        <img v-bind:src="img + data.profile_picture" alt="">
                    </a>
                    <div class="reviews_section__content">
                        <a v-bind:href="url" class="link link--reviewer-name">
                            {{data.profile_name}}
                            </a>
                        <div class="comment">
                            {{data.comment}}
                        </div>
                        <div class="interaction">
                            <a href="#" class="link link--interaction" @click.prevent="likeStatus()">
                                {{facebookRu.message}}
                            </a>
                            <a v-bind:href="url" class="link link--interaction">
                                Reply
                            </a>
                            <span class="icon">{{data.likes}}</span>
                        </div>
                    </div>
                </div>`,
    props: ['data', 'img', 'url'],
    data: function () {
        return {
            facebookRu: {
                message: 'Like',
                status: false
            }
        }

    },
    methods: {
        likeStatus: function () {
            this.facebookRu.status = !this.facebookRu.status
            if (this.facebookRu.status) {
                this.facebookRu.message = 'Unlike'
                this.data.likes += 1
            } else {
                this.facebookRu.message = 'Like'
                this.data.likes -= 1
            }
        }
    }
})