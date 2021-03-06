var Beauty = (function () {
    function Beauty() {
        this.messageLock = false;
    }

    /**
     * 弹出确认框
     * @param message 提示信息
     * @param btnTitle 按钮名称
     * @param callback 确认后执行的回调喊出
     */
    Beauty.prototype.alert = function (message, btnTitle, callback) {
        var mask = document.createElement('div');
        mask.setAttribute('class', 'beauty-mask beauty-mask-alert');
        var alertBox = document.createElement('div');
        alertBox.setAttribute('class', 'beauty-alert');

        btnTitle = !btnTitle ? 'ok' : btnTitle;
        alertBox.innerHTML = '<div class="beauty-alert-message">'+message+'</div><div class="beauty-alert-button"><button>'+btnTitle+'</button></div>';
        mask.appendChild(alertBox);
        document.body.appendChild(mask);

        window.getComputedStyle(alertBox).top;
        window.getComputedStyle(mask).top;
        alertBox.className += ' beauty-animate-show';
        mask.className += ' beauty-animate-sideIn';

        document.querySelector('.beauty-alert button').addEventListener('click', function () {

            setTimeout(function() {
                var element = document.querySelector('.beauty-alert');
                var mask = document.querySelector('.beauty-mask-alert');
                element.className += ' beauty-animate-hide';
                mask.className += ' beauty-animate-sideOut';
                element.addEventListener("transitionend", function() {
                    element.remove();
                    mask.remove();
                    if (callback) {
                        callback(true);
                    }
                });
            }, 100);
        });
    };

    /**
     * 信息提示
     * @param message
     * @param type
     * @param duration
     * @param callback
     * @returns {boolean}
     */
    Beauty.prototype.message = function (message, type, duration, callback) {

        if (this.messageLock) {
            return false;
        }

        var element = document.createElement('div');
        var that = this;
        duration = duration * 1000;

        var fontIcon = 'icon-info';
        if (type == 'info' || type == 'default') {
            fontIcon = 'icon icon-info';
        }
        if (type == 'success') {
            fontIcon = 'icon icon-check';
        }
        if (type == 'warning') {
            fontIcon = 'icon icon-close';
        }
        if (type == 'danger') {
            fontIcon = 'icon icon-close';
        }

        element.innerHTML = '<div class="beauty-message-container beauty-message--'+type+'"><i class="zmdi '+fontIcon+'"></i>'+message+'</div>';
        element.setAttribute('class', 'beauty-message');
        document.body.appendChild(element);
        window.getComputedStyle(element).top;
        element.className += ' beauty-animate-show';
        this.messageLock = true;
        setTimeout(function() {
            var element = document.querySelector('.beauty-message');
            element.className += ' beauty-animate-hide';
            element.addEventListener("transitionend", function() {
                element.remove();
            });

            that.messageLock = false;

            if (callback) {
                callback(true);
            }
        }, duration);

        return true;
    };

    Beauty.prototype.modal = function (title, html, okBtn, cancelBtn, okCallback, cancelCallback) {
        title = !title ? '提示信息' : title;
        var mask = document.createElement('div');
        mask.setAttribute('class', 'beauty-mask beauty-mask-modal');
        var element = document.createElement('div');
        element.setAttribute('class', 'beauty-modal');
        element.innerHTML = '<h2>'+title+'<i class="ion-close"></i></h2><div class="beauty-modal-info">' + html + '</div>';
        mask.appendChild(element);

        okBtn = !okBtn ? 'ok' : okBtn;
        cancelBtn = !cancelBtn ? 'cancel' : cancelBtn;

        element.innerHTML += '<div class="beauty-modal-action"><button class="beauty-modal-cancel">'+cancelBtn+'</button><button class="beauty-modal-ok">'+okBtn+'</button></div>';

        document.body.appendChild(mask);

        window.getComputedStyle(mask).top;
        window.getComputedStyle(element).top;
        mask.className += ' beauty-animate-sideIn';
        element.className += ' beauty-animate-show';

        var that = this;

        document.querySelector('.beauty-modal-ok').addEventListener('click', function () {
            that.modalCancel(okCallback);
        });

        document.querySelector('.beauty-modal-cancel').addEventListener('click', function () {
            that.modalCancel(cancelCallback);
        });

        document.querySelector('.beauty-modal h2 i').addEventListener('click', function () {
            that.modalCancel(cancelCallback);
        });

        Beauty.prototype.modalCancel = function(callback) {
            setTimeout(function() {
                if (callback) {
                    return callback(true);
                }
                var element = document.querySelector('.beauty-modal');
                var mask = document.querySelector('.beauty-mask-modal');
                element.className += ' beauty-animate-hide-e';
                mask.className += ' beauty-animate-sideOut';
                element.addEventListener("transitionend", function() {
                    element.remove();
                    mask.remove();
                });
            }, 200);
        }
    };

    Beauty.prototype.dropdown = function (ele, menu) {
        var dropdown = document.querySelector('.beauty-dropdown');
        if (dropdown) {
            dropdown.remove();
        }

        var parent = ele[0].parentNode;

        parent.className += ' beauty-dropdown-action';

        var html = '';
        for (var i in menu.title) {
            html += '<div class="beauty-dropdown-'+i+'">'+menu.title[i]+'</div>';
        }

        var element = document.createElement('div');
        element.innerHTML = html;
        element.setAttribute('class', 'beauty-dropdown');
        parent.appendChild(element);
    };

    return Beauty;
}());
